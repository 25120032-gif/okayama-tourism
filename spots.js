"use strict";

/*
 * おかやま旅ナビで紹介するスポット一覧
 *
 * ここに観光スポットの情報をまとめておくと、
 * main.jsから読み込んで検索やルート作成に使える。
 *
 * 料金や滞在時間は計画段階の目安。
 * 実際に公開・発表するときは公式情報を確認する。
 */

const spots = [

    // ========================================
    // 岡山市
    // ========================================

    {
        id: 1,
        name: "岡山後楽園",
        area: "岡山市",
        purpose: "観光",
        budget: 500,
        time: 90,
        description:
            "広い庭園を歩きながら、季節ごとの景色や日本らしい庭園の雰囲気を楽しめるスポット。",
        tag: "日本庭園",
        category: "定番",
        address: "岡山市北区後楽園",
        access: "岡山駅からバスなどでアクセス可能",
        hours: "季節によって異なるため公式情報を確認",
        mapQuery: "岡山後楽園",
        image:
            "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1000&q=80",
        note:
            "入園料・開園時間・イベント情報は訪問前に公式情報を確認する。"
    },

    {
        id: 2,
        name: "岡山城",
        area: "岡山市",
        purpose: "観光",
        budget: 500,
        time: 60,
        description:
            "黒い外観が特徴的なお城。歴史に触れながら、岡山の街の魅力を知ることができる。",
        tag: "歴史",
        category: "定番",
        address: "岡山市北区丸の内",
        access: "路面電車やバスなどを利用してアクセス可能",
        hours: "開館時間は公式情報を確認",
        mapQuery: "岡山城",
        image: "images/okayama-castle.jpg",
        note:
            "イベントや休館日、入館料などを事前に確認する。"
    },

    {
        id: 3,
        name: "池田動物園",
        area: "岡山市",
        purpose: "体験",
        budget: 1200,
        time: 120,
        description:
            "さまざまな動物を見ながら過ごせる動物園。家族や友人とのお出かけ先としても考えられる。",
        tag: "動物",
        category: "定番",
        address: "岡山市北区京山",
        access: "岡山駅周辺からバスや徒歩などでアクセス可能",
        hours: "営業日・営業時間は公式情報を確認",
        mapQuery: "池田動物園 岡山",
        image:
            "https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=1000&q=80",
        note:
            "料金や営業日、動物の展示状況は訪問前に確認する。"
    },

    {
        id: 4,
        name: "人と科学の未来館サイピア",
        area: "岡山市",
        purpose: "体験",
        budget: 0,
        time: 90,
        description:
            "科学に関する展示や体験を通じて、楽しみながら学べる施設。天候に左右されにくいお出かけ先。",
        tag: "科学体験",
        category: "穴場候補",
        address: "岡山市北区伊島町",
        access: "岡山駅周辺からバスなどでアクセス可能",
        hours: "開館日・営業時間は公式情報を確認",
        mapQuery: "人と科学の未来館サイピア",
        image:
            "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1000&q=80",
        note:
            "展示やイベントによって内容が異なるため、事前に公式情報を確認する。"
    },

    {
        id: 5,
        name: "西川緑道公園",
        area: "岡山市",
        purpose: "自然",
        budget: 0,
        time: 30,
        description:
            "街の中を歩きながら緑や水辺を楽しめる場所。買い物や食事のついでに立ち寄るコースにも向いている。",
        tag: "街歩き",
        category: "穴場候補",
        address: "岡山市北区西川周辺",
        access: "岡山駅周辺から徒歩などでアクセス可能",
        hours: "散策時は現地の案内や利用ルールを確認",
        mapQuery: "西川緑道公園 岡山",
        image:
            "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1000&q=80",
        note:
            "イベント開催時は混雑状況や交通規制を確認する。"
    },

    {
        id: 6,
        name: "吉備津神社",
        area: "岡山市",
        purpose: "観光",
        budget: 0,
        time: 60,
        description:
            "歴史や建築に触れながら、落ち着いた雰囲気の中で参拝できる神社。",
        tag: "歴史・文化",
        category: "穴場候補",
        address: "岡山市北区吉備津",
        access: "JR吉備線などを利用してアクセス可能",
        hours: "参拝時間や施設の利用条件は公式情報を確認",
        mapQuery: "吉備津神社 岡山",
        image:
            "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?auto=format&fit=crop&w=1000&q=80",
        note:
            "祭事などで通常と利用状況が異なる場合がある。"
    },


    // ========================================
    // 倉敷市
    // ========================================

    {
        id: 7,
        name: "倉敷美観地区",
        area: "倉敷市",
        purpose: "観光",
        budget: 0,
        time: 120,
        description:
            "白壁の建物や川沿いの景色が特徴的なエリア。街歩きやカフェ巡りなどを楽しめる。",
        tag: "街歩き",
        category: "定番",
        address: "倉敷市中央周辺",
        access: "JR倉敷駅から徒歩などでアクセス可能",
        hours: "店舗や施設ごとに異なる",
        mapQuery: "倉敷美観地区",
        image:
            "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1000&q=80",
        note:
            "店舗の営業時間や施設の入館料は個別に確認する。"
    },

    {
        id: 8,
        name: "児島ジーンズストリート",
        area: "倉敷市",
        purpose: "観光",
        budget: 0,
        time: 90,
        description:
            "ジーンズに関係するお店が集まるエリア。買い物だけでなく、地域のものづくりについても知ることができる。",
        tag: "ファッション",
        category: "穴場候補",
        address: "倉敷市児島味野周辺",
        access: "JR児島駅から徒歩やバスなどでアクセス可能",
        hours: "店舗によって異なる",
        mapQuery: "児島ジーンズストリート",
        image:
            "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=1000&q=80",
        note:
            "買い物を予定する場合は店舗ごとの営業時間を確認する。"
    },

    {
        id: 9,
        name: "種松山公園",
        area: "倉敷市",
        purpose: "自然",
        budget: 0,
        time: 60,
        description:
            "自然の中で散策を楽しめる公園。街中とは違う景色を楽しみたいときの候補になる。",
        tag: "自然散策",
        category: "穴場候補",
        address: "倉敷市福田町福田周辺",
        access: "公共交通機関の運行状況や車でのアクセスを事前に確認",
        hours: "施設や季節によって利用条件を確認",
        mapQuery: "種松山公園 倉敷",
        image:
            "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1000&q=80",
        note:
            "花の見頃や施設の利用条件は事前に確認する。"
    },


    // ========================================
    // 玉野市
    // ========================================

    {
        id: 10,
        name: "王子が岳",
        area: "玉野市",
        purpose: "自然",
        budget: 0,
        time: 90,
        description:
            "瀬戸内海の景色や自然を楽しめる場所。海を眺めながら過ごしたい人に向いている。",
        tag: "絶景",
        category: "穴場候補",
        address: "玉野市渋川周辺",
        access: "バスや車などのアクセス方法を事前に確認",
        hours: "散策ルートや施設の利用条件を確認",
        mapQuery: "王子が岳 岡山",
        image:
            "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1000&q=80",
        note:
            "天候や足元に注意し、現地の案内に従って散策する。"
    },

    {
        id: 11,
        name: "渋川海岸",
        area: "玉野市",
        purpose: "自然",
        budget: 0,
        time: 90,
        description:
            "海辺を歩いたり、景色を眺めたりして過ごせるスポット。のんびりしたい日の候補になる。",
        tag: "海辺",
        category: "穴場候補",
        address: "玉野市渋川",
        access: "バスや車などのアクセス方法を事前に確認",
        hours: "施設や季節ごとの利用条件を確認",
        mapQuery: "渋川海岸 岡山",
        image:
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80",
        note:
            "海水浴などを予定する場合は、営業期間や安全情報を確認する。"
    },

    {
        id: 12,
        name: "渋川・王子が岳周辺",
        area: "玉野市",
        purpose: "自然",
        budget: 0,
        time: 60,
        description:
            "海辺や自然を楽しむ場所を組み合わせて、玉野市周辺を巡るための候補エリア。",
        tag: "周遊候補",
        category: "穴場候補",
        address: "玉野市渋川周辺",
        access: "各スポット間の距離や交通手段を事前に確認",
        hours: "立ち寄る場所ごとに確認",
        mapQuery: "渋川海岸 王子が岳 玉野",
        image:
            "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80",
        note:
            "王子が岳や渋川海岸そのものとは別の観光施設ではなく、周辺エリアを示す候補。"
    },


    // ========================================
    // 津山市
    // ========================================

    {
        id: 13,
        name: "津山まなびの鉄道館",
        area: "津山市",
        purpose: "体験",
        budget: 310,
        time: 90,
        description:
            "鉄道に関する展示を通じて、地域の交通や鉄道の歴史に触れられる施設。",
        tag: "鉄道",
        category: "穴場候補",
        address: "津山市大谷",
        access: "JR津山駅周辺からアクセス方法を確認",
        hours: "開館日・営業時間は公式情報を確認",
        mapQuery: "津山まなびの鉄道館",
        image:
            "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1000&q=80",
        note:
            "入館料・開館日・展示内容は変更される場合がある。"
    },

    {
        id: 14,
        name: "津山城（鶴山公園）",
        area: "津山市",
        purpose: "観光",
        budget: 500,
        time: 90,
        description:
            "石垣などの歴史的な景観を楽しめる場所。季節によっては花を目当てに訪れる人もいる。",
        tag: "歴史・景色",
        category: "定番",
        address: "津山市山下",
        access: "津山駅周辺から徒歩などでアクセス可能",
        hours: "開園時間・入園料は公式情報を確認",
        mapQuery: "津山城 鶴山公園",
        image:
            "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=1000&q=80",
        note:
            "桜の時期などは混雑する場合があるため、訪問時期を考えて計画する。"
    },

    {
        id: 15,
        name: "衆楽園",
        area: "津山市",
        purpose: "自然",
        budget: 0,
        time: 45,
        description:
            "庭園の景色を眺めながら、ゆっくり散策できる場所。落ち着いた時間を過ごしたい人に向いている。",
        tag: "庭園",
        category: "穴場候補",
        address: "津山市山北",
        access: "津山駅周辺からバスや車などのアクセスを確認",
        hours: "利用時間などは公式情報を確認",
        mapQuery: "衆楽園 津山",
        image:
            "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1000&q=80",
        note:
            "季節や天候によって景色が変わるため、訪問時期も考えてみる。"
    },


    // ========================================
    // 瀬戸内市
    // ========================================

    {
        id: 16,
        name: "備前長船刀剣博物館",
        area: "瀬戸内市",
        purpose: "体験",
        budget: 500,
        time: 90,
        description:
            "日本刀に関する展示などを通して、地域の伝統技術や歴史に触れられる博物館。",
        tag: "伝統技術",
        category: "穴場候補",
        address: "瀬戸内市長船町長船",
        access: "公共交通機関や車でのアクセス方法を事前に確認",
        hours: "開館日・営業時間は公式情報を確認",
        mapQuery: "備前長船刀剣博物館",
        image:
            "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=1000&q=80",
        note:
            "展示・イベント・体験の内容は時期によって異なる場合がある。"
    },


    // ========================================
    // 総社市
    // ========================================

    {
        id: 17,
        name: "備中国分寺",
        area: "総社市",
        purpose: "観光",
        budget: 0,
        time: 45,
        description:
            "五重塔で知られる歴史的なスポット。周辺の景色と合わせて地域を巡る候補にできる。",
        tag: "歴史・景色",
        category: "穴場候補",
        address: "総社市上林",
        access: "公共交通機関や車でのアクセス方法を事前に確認",
        hours: "施設の利用条件などは現地の案内を確認",
        mapQuery: "備中国分寺 総社",
        image:
            "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1000&q=80",
        note:
            "周辺を散策する場合は、現地の案内や立ち入りルールを守る。"
    }

];