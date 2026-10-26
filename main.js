"use strict";

/*
 * おかやま旅ナビの画面を動かすプログラム
 *
 * HTMLにある検索フォームやボタンを使って、
 * スポットの検索・詳細表示・お気に入り・ルート作成を行う。
 */

document.addEventListener("DOMContentLoaded", () => {

    // HTMLから必要な部品を取得する
    const searchForm = document.getElementById("search-form");
    const keywordInput = document.getElementById("keyword");

    const areaSelect = document.getElementById("area");
    const budgetSelect = document.getElementById("budget");
    const timeSelect = document.getElementById("time");
    const purposeSelect = document.getElementById("purpose");
    const categorySelect = document.getElementById("category");
    const sortSelect = document.getElementById("sort");

    const spotList = document.getElementById("spot-list");
    const resultMessage = document.getElementById("result-message");
    const emptyState = document.getElementById("empty-state");

    const resetButton = document.getElementById("reset-button");
    const emptyResetButton = document.getElementById("empty-reset-button");

    const routeButton = document.getElementById("route-button");
    const routeResult = document.getElementById("route-result");

    const favoriteList = document.getElementById("favorite-list");
    const favoriteMessage = document.getElementById("favorite-message");
    const favoriteEmpty = document.getElementById("favorite-empty");

    const spotDialog = document.getElementById("spot-dialog");
    const dialogContent = document.getElementById("dialog-content");
    const dialogClose = document.getElementById("dialog-close");


    // スポット情報が読み込まれているか確認する
    if (!Array.isArray(spots)) {
        resultMessage.textContent =
            "スポット情報を読み込めなかったよ。spots.jsを確認してね。";

        return;
    }


    // お気に入りを保存するときに使う名前
    const FAVORITES_KEY = "okayamaTabiNaviFavorites";


    // 保存されているお気に入りを読み込む
    function loadFavorites() {

        try {
            const savedData = localStorage.getItem(FAVORITES_KEY);

            if (!savedData) {
                return [];
            }

            const parsedData = JSON.parse(savedData);

            if (!Array.isArray(parsedData)) {
                return [];
            }

            // 現在のスポット一覧に存在するIDだけを残す
            return parsedData.filter(id =>
                spots.some(spot => spot.id === id)
            );

        } catch (error) {
            console.warn("お気に入りを読み込めなかったよ。", error);
            return [];
        }
    }


    // お気に入りのIDを保存する
    function saveFavorites() {

        try {
            localStorage.setItem(
                FAVORITES_KEY,
                JSON.stringify(favoriteIds)
            );

            return true;

        } catch (error) {
            console.warn("お気に入りを保存できなかったよ。", error);
            return false;
        }
    }


    // お気に入りとして保存されているか調べる
    function isFavorite(spotId) {
        return favoriteIds.includes(spotId);
    }


    // 最初に保存されていたお気に入りを読み込む
    let favoriteIds = loadFavorites();


    // HTML要素を安全に作るための共通処理
    function createElement(tagName, className, text = "") {

        const element = document.createElement(tagName);

        if (className) {
            element.className = className;
        }

        // textContentを使うことで、文字がHTMLとして実行されないようにする
        element.textContent = text;

        return element;
    }


    // 金額を見やすい表示にする
    function formatPrice(price) {

        if (price === 0) {
            return "無料";
        }

        return `${Number(price).toLocaleString("ja-JP")}円`;
    }


    // 滞在時間を見やすい表示にする
    function formatTime(minutes) {

        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;

        if (hours === 0) {
            return `${remainingMinutes}分`;
        }

        if (remainingMinutes === 0) {
            return `${hours}時間`;
        }

        return `${hours}時間${remainingMinutes}分`;
    }


    // Googleマップで場所を調べるためのURLを作る
    function createMapUrl(spot) {

        const query = spot.mapQuery || `${spot.name} ${spot.area}`;

        return `https://www.google.com/maps/search/?api=1&query=${
            encodeURIComponent(query)
        }`;
    }


    // 検索条件に合うスポットを取り出す
    function getFilteredSpots() {

        const keyword = keywordInput.value.trim().toLowerCase();

        const selectedArea = areaSelect.value;
        const selectedBudget = budgetSelect.value;
        const selectedTime = timeSelect.value;
        const selectedPurpose = purposeSelect.value;
        const selectedCategory = categorySelect.value;
        const selectedSort = sortSelect.value;


        // まずは条件に合うスポットだけに絞り込む
        const filteredSpots = spots.filter(spot => {

            // スポット名・説明・地域などをキーワード検索の対象にする
            const searchableText = [
                spot.name,
                spot.area,
                spot.purpose,
                spot.description,
                spot.tag,
                spot.category,
                spot.address
            ]
                .filter(Boolean)
                .join(" ")
                .toLowerCase();

            const matchesKeyword =
                keyword === "" || searchableText.includes(keyword);

            const matchesArea =
                selectedArea === "all" || spot.area === selectedArea;

            const matchesBudget =
                selectedBudget === "all" ||
                Number(spot.budget) <= Number(selectedBudget);

            const matchesTime =
                selectedTime === "all" ||
                Number(spot.time) <= Number(selectedTime);

            const matchesPurpose =
                selectedPurpose === "all" ||
                spot.purpose === selectedPurpose;

            const matchesCategory =
                selectedCategory === "all" ||
                spot.category === selectedCategory;

            return (
                matchesKeyword &&
                matchesArea &&
                matchesBudget &&
                matchesTime &&
                matchesPurpose &&
                matchesCategory
            );
        });


        // 検索結果を選んだ順番に並び替える
        filteredSpots.sort((a, b) => {

            if (selectedSort === "budget") {
                return Number(a.budget) - Number(b.budget);
            }

            if (selectedSort === "time") {
                return Number(a.time) - Number(b.time);
            }

            if (selectedSort === "name") {
                return a.name.localeCompare(b.name, "ja");
            }

            // おすすめ順はspots.jsに書いた順番を基本にする
            return spots.indexOf(a) - spots.indexOf(b);
        });

        return filteredSpots;
    }


    // お気に入りボタンを作る
    function createFavoriteButton(spot) {

        const button = createElement(
            "button",
            "favorite-button",
            isFavorite(spot.id) ? "♥" : "♡"
        );

        button.type = "button";

        button.classList.toggle(
            "is-favorite",
            isFavorite(spot.id)
        );

        button.setAttribute(
            "aria-label",
            isFavorite(spot.id)
                ? `${spot.name}をお気に入りから解除`
                : `${spot.name}をお気に入りに登録`
        );

        button.setAttribute(
            "aria-pressed",
            String(isFavorite(spot.id))
        );

        button.addEventListener("click", () => {
            toggleFavorite(spot.id);
        });

        return button;
    }


    // スポットカードを1枚作る
    function createSpotCard(spot) {

        const card = createElement("article", "spot-card");

        // 写真を表示する部分
        const photo = createElement("div", "spot-photo");

        const image = document.createElement("img");

        image.src = spot.image || "";
        image.alt = `${spot.name}のイメージ写真`;
        image.loading = "lazy";
        image.decoding = "async";

        let imageCredit = null;

        if (spot.imageCredit) {
            imageCredit = createElement("span", "spot-photo-credit");

            const sourceLink = createElement(
                "a",
                "",
                spot.imageCredit.author
            );
            sourceLink.href = spot.imageCredit.sourceUrl;
            sourceLink.target = "_blank";
            sourceLink.rel = "noopener noreferrer";

            const licenseLink = createElement(
                "a",
                "",
                spot.imageCredit.license
            );
            licenseLink.href = spot.imageCredit.licenseUrl;
            licenseLink.target = "_blank";
            licenseLink.rel = "noopener noreferrer";

            imageCredit.append(
                sourceLink,
                document.createTextNode(" / "),
                licenseLink
            );
        }

        // 写真を読み込めなかった場合は代わりの表示を出す
        image.addEventListener("error", () => {

            image.remove();
            imageCredit?.remove();

            if (!photo.querySelector(".spot-photo-placeholder")) {
                const placeholder = createElement(
                    "div",
                    "spot-photo-placeholder",
                    "写真を表示できません"
                );

                photo.prepend(placeholder);
            }

        }, { once: true });


        // スポットの種類を写真の上に表示する
        const tag = createElement(
            "span",
            "spot-tag",
            spot.category || "スポット"
        );

        photo.append(image, tag);

        if (imageCredit) {
            photo.append(imageCredit);
        }


        // カードの本文
        const body = createElement("div", "spot-card-body");

        const area = createElement(
            "p",
            "spot-card-area",
            spot.area || "地域情報なし"
        );

        const title = createElement(
            "h3",
            "spot-card-title",
            spot.name
        );

        const description = createElement(
            "p",
            "spot-card-description",
            spot.description || "詳しい情報は公式サイトなどで確認してね。"
        );


        // 料金と所要時間を表示する
        const facts = createElement("div", "spot-facts");

        const price = createElement(
            "span",
            "spot-fact",
            `￥ ${formatPrice(Number(spot.budget) || 0)}`
        );

        const time = createElement(
            "span",
            "spot-fact",
            `時計 ${formatTime(Number(spot.time) || 0)}`
        );

        facts.append(price, time);


        // 詳細ボタンとお気に入りボタン
        const actions = createElement("div", "spot-card-actions");

        const detailButton = createElement(
            "button",
            "small-button",
            "詳しく見る →"
        );

        detailButton.type = "button";

        detailButton.addEventListener("click", () => {
            showSpotDetails(spot);
        });


        const favoriteButton = createFavoriteButton(spot);

        actions.append(detailButton, favoriteButton);


        // Googleマップへのリンク
        const footer = createElement("div", "spot-card-footer");

        const mapLink = createElement(
            "a",
            "small-button",
            "地図を見る ↗"
        );

        mapLink.href = createMapUrl(spot);
        mapLink.target = "_blank";
        mapLink.rel = "noopener noreferrer";
        mapLink.setAttribute(
            "aria-label",
            `${spot.name}をGoogleマップで開く`
        );

        footer.append(mapLink);


        body.append(area, title, description, facts, actions, footer);

        card.append(photo, body);

        return card;
    }


    // 詳細画面の情報を安全に表示する
    function showSpotDetails(spot) {

        // 前に表示した内容を消してから、新しい情報を入れる
        dialogContent.replaceChildren();

        const title = createElement("h2", "", spot.name);

        const area = createElement(
            "p",
            "",
            `${spot.area}｜${spot.purpose || "観光スポット"}`
        );

        const description = createElement(
            "p",
            "",
            spot.description || "紹介文はまだ登録されていないよ。"
        );


        // 住所や営業時間などを一覧にする
        const information = createElement("dl");

        const detailItems = [
            ["地域", spot.area],
            ["料金の目安", formatPrice(Number(spot.budget) || 0)],
            ["滞在時間", formatTime(Number(spot.time) || 0)],
            ["住所", spot.address || "公式情報を確認してね"],
            ["アクセス", spot.access || "公式情報を確認してね"],
            ["営業時間", spot.hours || "公式情報を確認してね"],
            ["メモ", spot.note || "訪問前に最新情報を確認してね"]
        ];

        detailItems.forEach(([labelText, valueText]) => {

            const label = createElement("dt", "", labelText);
            const value = createElement("dd", "", valueText);

            information.append(label, value);
        });


        // 地図を開くボタン
        const mapLink = createElement(
            "a",
            "button button-primary",
            "Googleマップで場所を確認する ↗"
        );

        mapLink.href = createMapUrl(spot);
        mapLink.target = "_blank";
        mapLink.rel = "noopener noreferrer";


        dialogContent.append(
            title,
            area,
            description,
            information,
            mapLink
        );


        // ブラウザが対応していればダイアログとして開く
        if (typeof spotDialog.showModal === "function") {
            spotDialog.showModal();
        } else {
            alert(
                `${spot.name}\n\n${spot.description || ""}\n\n` +
                `住所：${spot.address || "公式情報を確認してね"}`
            );
        }
    }


    // お気に入りを登録・解除する
    function toggleFavorite(spotId) {

        if (isFavorite(spotId)) {
            favoriteIds = favoriteIds.filter(id => id !== spotId);
        } else {
            favoriteIds.push(spotId);
        }

        const saved = saveFavorites();

        // 検索結果とお気に入り一覧の両方を更新する
        renderSpots();
        renderFavorites();

        if (!saved) {
            favoriteMessage.textContent =
                "保存できなかったよ。ブラウザの保存設定を確認してね。";
        }
    }


    // 検索結果を画面に表示する
    function renderSpots() {

        const filteredSpots = getFilteredSpots();

        spotList.replaceChildren();

        filteredSpots.forEach(spot => {
            spotList.appendChild(createSpotCard(spot));
        });

        resultMessage.textContent =
            `${filteredSpots.length}件のスポットが見つかったよ`;

        emptyState.hidden = filteredSpots.length !== 0;
        spotList.hidden = filteredSpots.length === 0;
    }


    // お気に入り一覧を画面に表示する
    function renderFavorites() {

        favoriteList.replaceChildren();

        const favorites = spots.filter(spot =>
            isFavorite(spot.id)
        );

        favoriteMessage.textContent =
            `お気に入り登録：${favorites.length}件`;

        favoriteEmpty.hidden = favorites.length !== 0;
        favoriteList.hidden = favorites.length === 0;

        favorites.forEach(spot => {
            favoriteList.appendChild(createSpotCard(spot));
        });
    }


    // おすすめルートを作る
    function renderRoute() {

        // 現在の検索条件に合うスポットを使う
        const candidates = getFilteredSpots();

        if (candidates.length === 0) {

            routeResult.replaceChildren();

            const message = createElement(
                "div",
                "empty-state",
                "条件に合うスポットがないため、ルートを作れなかったよ。検索条件を変更してみてね。"
            );

            routeResult.appendChild(message);

            return;
        }


        // 選択した時間の範囲内でスポットを選ぶ
        const maxTime = timeSelect.value === "all"
            ? 300
            : Number(timeSelect.value);

        const selectedSpots = [];
        let totalTime = 0;
        let totalBudget = 0;

        for (const spot of candidates) {

            const stayTime = Number(spot.time) || 0;
            const price = Number(spot.budget) || 0;

            // 時間を超える場合は、そのスポットを追加しない
            if (totalTime + stayTime > maxTime) {
                continue;
            }

            selectedSpots.push(spot);

            totalTime += stayTime;
            totalBudget += price;
        }


        routeResult.replaceChildren();

        if (selectedSpots.length === 0) {

            const message = createElement(
                "div",
                "empty-state",
                "設定した時間内に入るスポットがなかったよ。時間を長くしてみてね。"
            );

            routeResult.appendChild(message);

            return;
        }


        // ルートの概要を表示する
        const plan = createElement("div", "route-plan");

        const heading = createElement(
            "h3",
            "",
            "今回のおすすめプラン"
        );

        const introduction = createElement(
            "p",
            "",
            "選択した条件に合うスポットを、滞在時間の合計を考えて並べたプランだよ。"
        );


        // 合計時間・料金・スポット数を表示する
        const summary = createElement("div", "route-summary");

        const summaryItems = [
            ["スポット数", `${selectedSpots.length}か所`],
            ["滞在時間の合計", formatTime(totalTime)],
            ["料金の合計（目安）", formatPrice(totalBudget)]
        ];

        summaryItems.forEach(([labelText, valueText]) => {

            const item = createElement("div", "route-summary-item");

            const label = createElement("span", "", labelText);
            const value = createElement("strong", "", valueText);

            item.append(label, value);
            summary.appendChild(item);
        });


        // 立ち寄るスポットを順番に表示する
        const list = createElement("ol", "route-list");

        selectedSpots.forEach((spot, index) => {

            const item = createElement("li");

            const number = createElement(
                "span",
                "route-number",
                String(index + 1)
            );

            const content = createElement("div");

            const title = createElement(
                "strong",
                "",
                spot.name
            );

            const details = createElement(
                "p",
                "",
                `${spot.area}｜滞在 ${formatTime(Number(spot.time) || 0)}｜料金 ${formatPrice(Number(spot.budget) || 0)}`
            );

            const mapLink = createElement(
                "a",
                "small-button",
                "地図を見る ↗"
            );

            mapLink.href = createMapUrl(spot);
            mapLink.target = "_blank";
            mapLink.rel = "noopener noreferrer";

            content.append(title, details, mapLink);
            item.append(number, content);

            list.appendChild(item);
        });


        // 実際の移動時間は含めていないことを伝える
        const warning = createElement(
            "p",
            "route-warning",
            "注意：このプランは滞在時間の合計をもとに作成しているよ。スポット間の距離・移動時間・交通費は計算していないため、出発前に地図や交通機関の情報を確認してね。"
        );


        plan.append(
            heading,
            introduction,
            summary,
            list,
            warning
        );

        routeResult.appendChild(plan);

        // 作成したプランが見える位置まで移動する
        routeResult.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }


    // 検索条件を初期状態に戻す
    function resetFilters() {

        searchForm.reset();

        // リセット後はおすすめ順に戻す
        sortSelect.value = "recommended";

        renderSpots();
    }


    // 検索ボタンを押したときに検索する
    searchForm.addEventListener("submit", event => {

        event.preventDefault();

        renderSpots();

        // 検索結果の位置まで移動する
        document.querySelector(".results-heading").scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });


    // 並び替えを変えたときも結果を更新する
    sortSelect.addEventListener("change", renderSpots);


    // 条件リセットボタン
    resetButton.addEventListener("click", resetFilters);
    emptyResetButton.addEventListener("click", resetFilters);


    // おすすめルート作成ボタン
    routeButton.addEventListener("click", renderRoute);


    // ダイアログを閉じるボタン
    dialogClose.addEventListener("click", () => {
        spotDialog.close();
    });


    // ダイアログの外側をクリックした場合も閉じる
    spotDialog.addEventListener("click", event => {

        if (event.target === spotDialog) {
            spotDialog.close();
        }
    });


    // 最初に検索結果とお気に入りを表示する
    renderSpots();
    renderFavorites();

});