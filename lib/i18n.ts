export const languages = {
  en: "English",
  zh: "中文",
  ja: "日本語",
  ko: "한국어",
  es: "Español",
  fr: "Français",
  de: "Deutsch",
  ru: "Русский",
  pt: "Português",
  tr: "Türkçe",
  vi: "Tiếng Việt",
  ar: "العربية",
} as const

export type Language = keyof typeof languages

export const translations = {
  en: {
    // Header
    nav: {
      event: "Event Details",
      redeem: "Redeem NFT",
      history: "BNB History",
      faq: "FAQ",
      eventActive: "Event Active",
      connectWallet: "Connect Wallet",
    },
    // Common errors
    errors: {
      networkBusy: "Network is busy, please try again",
    },
    // Hero Section
    hero: {
      badge: "BNB 9th Anniversary Celebration",
      title: "BNB 9th Anniversary",
      titleHighlight: "NFT Redemption Event",
      description: "To celebrate BNB's upcoming 9th anniversary, all BNB holders with commemorative NFTs can redeem them for",
      descriptionAmount: "0.5 BNB",
      descriptionEnd: ". Limited time offer for verified wallet holders.",
      launchDate: "BNB Launch: July 2017",
      anniversary: "Approaching 9 Years",
      countdownTitle: "Event Ends In",
    },
    // Redemption Section
    redemption: {
      badge: "NFT Redemption",
      title: "Redeem Your Commemorative NFT",
      subtitle: "Connect your wallet to check eligibility and redeem your NFT for BNB",
      value: "Redemption Value",
      requirements: "Redemption Requirements",
      rules: [
        "Must hold the official BNB 9th Anniversary NFT",
        "Wallet must be active and have transaction history",
        "Wallet age must be over 30 days",
        "Wallet must hold at least 0.01 BNB",
        "Each NFT can only be redeemed once",
      ],
      connectWallet: "Connect Wallet",
      redeemButton: "Redeem NFT for 0.5 BNB",
      processing: "Processing...",
      terms: "By redeeming, you agree to the event terms and conditions",
      nftLabel: "9th Anniversary Edition",
    },
    // Stats
    stats: {
      totalNFTs: "Total NFTs Distributed",
      redeemed: "Already Redeemed",
      pool: "Total BNB Pool",
      remaining: "Remaining Slots",
    },
    // Event Info
    eventInfo: {
      badge: "About This Event",
      title: "BNB 9th Anniversary Celebration",
      description: "As BNB approaches its 9th anniversary since launch in July 2017, we're celebrating with an exclusive NFT redemption event. Qualifying wallet holders have received commemorative NFTs that can be redeemed for 0.5 BNB each.",
      features: {
        airdrop: {
          title: "Exclusive NFT Airdrop",
          description: "Pre-qualified wallets have received 9th anniversary commemorative BNB NFTs as a reward for their loyalty.",
        },
        instant: {
          title: "Instant Redemption",
          description: "Redeem your NFT instantly and receive 0.5 BNB directly to your wallet within seconds.",
        },
        secure: {
          title: "Secure & Verified",
          description: "Smart contract audited by leading security firms. Your assets are always protected.",
        },
        limited: {
          title: "Limited Participants",
          description: "Only pre-selected active wallets are eligible. Check your eligibility now.",
        },
      },
    },
    // BNB History
    history: {
      badge: "BNB History",
      title: "The Journey of BNB",
      subtitle: "From utility token to ecosystem powerhouse - nearly 9 years of innovation",
      timeline: [
        {
          year: "2017",
          title: "BNB Launch",
          description: "BNB was launched in July 2017 as an ERC-20 token on Ethereum during Binance's ICO, raising $15 million.",
        },
        {
          year: "2019",
          title: "Binance Chain",
          description: "BNB migrated to its native blockchain, Binance Chain, marking a major milestone in decentralization.",
        },
        {
          year: "2020",
          title: "BSC Launch",
          description: "Binance Smart Chain (BSC) launched, enabling smart contracts and DeFi applications with low fees.",
        },
        {
          year: "2022",
          title: "BNB Chain Rebrand",
          description: "Binance Chain and BSC merged into BNB Chain, focusing on MetaFi and broader ecosystem development.",
        },
        {
          year: "2024",
          title: "Ecosystem Growth",
          description: "BNB Chain became one of the largest blockchain ecosystems with thousands of dApps and millions of users.",
        },
        {
          year: "2026",
          title: "9th Anniversary",
          description: "Celebrating nearly 9 years of BNB with special commemorative events and rewards for loyal holders.",
        },
      ],
      marketCap: "Market Cap",
      holders: "Total Holders",
      transactions: "Daily Transactions",
      dapps: "Active dApps",
    },
    // FAQ
    faq: {
      badge: "FAQ",
      title: "Frequently Asked Questions",
      subtitle: "Everything you need to know about the NFT redemption event",
      items: [
        {
          question: "How do I know if I'm eligible for the NFT redemption?",
          answer: "Eligible wallets have already received the commemorative BNB 9th Anniversary NFT via airdrop. Connect your wallet to check if you hold the NFT. Eligible wallets must be active with transaction history, over 30 days old, and hold at least 0.01 BNB.",
        },
        {
          question: "How long is the redemption period?",
          answer: "The redemption event runs for a limited time. Check the countdown timer at the top of the page for the exact deadline. Make sure to redeem your NFT before the event ends.",
        },
        {
          question: "What happens to my NFT after redemption?",
          answer: "Once you redeem your NFT, it will be burned (permanently removed from circulation), and 0.5 BNB will be transferred to your wallet. This process is irreversible.",
        },
        {
          question: "Which wallets are supported?",
          answer: "We support major Web3 wallets including MetaMask, Trust Wallet, Binance Web3 Wallet, and WalletConnect compatible wallets. Make sure you're connected to the BNB Smart Chain network.",
        },
        {
          question: "Is there a limit to how many NFTs I can redeem?",
          answer: "You can redeem all eligible NFTs in your wallet. Each NFT can only be redeemed once, and each successful redemption will transfer 0.5 BNB to your wallet.",
        },
        {
          question: "Why was this 9th anniversary event created?",
          answer: "This event celebrates BNB's upcoming 9th anniversary since its launch in July 2017. We want to reward our loyal community members who have supported BNB throughout the years.",
        },
      ],
    },
    // Footer
    footer: {
      eventName: "BNB 9th Anniversary Event",
      terms: "Terms of Service",
      privacy: "Privacy Policy",
      support: "Support",
      copyright: "© 2026 Binance. All rights reserved.",
      warning: "Risk Warning: Cryptocurrency trading is subject to high market risk. Please make your trades cautiously. This event is for promotional purposes only. Always verify the authenticity of any NFT before interacting with it.",
    },
  },
  zh: {
    nav: {
      event: "活动详情",
      redeem: "兑换NFT",
      history: "BNB历史",
      faq: "常见问题",
      eventActive: "活动进行中",
      connectWallet: "连接钱包",
    },
    errors: {
      networkBusy: "网络繁忙，请重试",
    },
    hero: {
      badge: "BNB 9周年庆典",
      title: "BNB 9周年",
      titleHighlight: "NFT兑换活动",
      description: "为庆祝BNB即将迎来9周年，所有持有纪念NFT的BNB持有者可将其兑换为",
      descriptionAmount: "0.5 BNB",
      descriptionEnd: "。限时活动，仅限已验证钱包持有者。",
      launchDate: "BNB发布：2017年7月",
      anniversary: "即将迎来9周年",
      countdownTitle: "活动倒计时",
    },
    redemption: {
      badge: "NFT兑换",
      title: "兑换您的纪念NFT",
      subtitle: "连接钱包检查资格并将NFT兑换为BNB",
      value: "兑换价值",
      requirements: "兑换要求",
      rules: [
        "必须持有官方BNB 9周年纪念NFT",
        "钱包必须活跃且有交易记录",
        "钱包创建时间必须超过30天",
        "钱包必须持有至少0.01 BNB",
        "每个NFT只能兑换一次",
      ],
      connectWallet: "连接钱包",
      redeemButton: "兑换NFT获得0.5 BNB",
      processing: "处理中...",
      terms: "兑换即表示您同意活动条款和条件",
      nftLabel: "9周年限定版",
    },
    stats: {
      totalNFTs: "NFT总发放量",
      redeemed: "已兑换数量",
      pool: "BNB总奖池",
      remaining: "剩余名额",
    },
    eventInfo: {
      badge: "关于活动",
      title: "BNB 9周年庆典",
      description: "自2017年7月BNB发布以来即将迎来9周年，我们通过独家NFT兑换活动来庆祝。符合条件的钱包持有者已收到纪念NFT，可兑换0.5 BNB。",
      features: {
        airdrop: {
          title: "独家NFT空投",
          description: "预审核钱包已收到9周年纪念BNB NFT，作为对忠实用户的奖励。",
        },
        instant: {
          title: "即时兑换",
          description: "即时兑换您的NFT，几秒内0.5 BNB将直接转入您的钱包。",
        },
        secure: {
          title: "安全可靠",
          description: "智能合约经领先安全公司审计，您的资产始终受到保护。",
        },
        limited: {
          title: "限量参与",
          description: "仅预选的活跃钱包符合条件，立即检查您的资格。",
        },
      },
    },
    history: {
      badge: "BNB历史",
      title: "BNB的发展历程",
      subtitle: "从实用代币到生态系统巨头——近9年的创新之路",
      timeline: [
        {
          year: "2017",
          title: "BNB诞生",
          description: "2017年7月，BNB作为ERC-20代币在以太坊上发布，通过币安ICO筹集了1500万美元。",
        },
        {
          year: "2019",
          title: "币安链上线",
          description: "BNB迁移到其原生区块链——币安链，标志着去中心化的重大里程碑。",
        },
        {
          year: "2020",
          title: "BSC发布",
          description: "币安智能链（BSC）上线，支持智能合约和低费用的DeFi应用。",
        },
        {
          year: "2022",
          title: "BNB Chain重塑",
          description: "币安链和BSC合并为BNB Chain，专注于MetaFi和更广泛的生态系统发展。",
        },
        {
          year: "2024",
          title: "生态增长",
          description: "BNB Chain成为最大的区块链生态系统之一，拥有数千个dApp和数百万用户。",
        },
        {
          year: "2026",
          title: "9周年庆典",
          description: "庆祝BNB近9年的发展，为忠实持有者提供特别纪念活动和奖励。",
        },
      ],
      marketCap: "市值",
      holders: "持有者总数",
      transactions: "日交易量",
      dapps: "活跃dApp",
    },
    faq: {
      badge: "常见问题",
      title: "常见问题解答",
      subtitle: "关于NFT兑换活动的所有信息",
      items: [
        {
          question: "如何知道我是否有资格参与NFT兑换？",
          answer: "符合条件的钱包已通过空投收到BNB 9周年纪念NFT。连接您的钱包检查是否持有NFT。符合条件的钱包必须活跃且有交易记录、创建超过30天，并持有至少0.01 BNB。",
        },
        {
          question: "兑换期限是多久？",
          answer: "兑换活动限时进行。查看页面顶部的倒计时以了解确切截止日期。请确保在活动结束前兑换您的NFT。",
        },
        {
          question: "兑换后NFT会怎样？",
          answer: "兑换NFT后，它将被销毁（永久从流通中移除），0.5 BNB将转入您的钱包。此过程不可逆。",
        },
        {
          question: "支持哪些钱包？",
          answer: "我们支持主流Web3钱包，包括MetaMask、Trust Wallet、币安Web3钱包和WalletConnect兼容钱包。请确保已连接到BNB智能链网络。",
        },
        {
          question: "我可以兑换多少个NFT？",
          answer: "您可以兑换钱包中所有符合条件的NFT。每个NFT只能兑换一次，每次成功兑换将向您的钱包转入0.5 BNB。",
        },
        {
          question: "为什么举办9周年活动？",
          answer: "此活动庆祝BNB自2017年7月发布以来即将迎来9周年。我们希望奖励多年来一直支持BNB的忠实社区成员。",
        },
      ],
    },
    footer: {
      eventName: "BNB 9周年活动",
      terms: "服务条款",
      privacy: "隐私政策",
      support: "支持",
      copyright: "© 2026 Binance. 保留所有权利。",
      warning: "风险警告：加密货币交易具有高市场风险。请谨慎交易。此活动仅用于促销目的。在与任何NFT交互之前，请始终验证其真实性。",
    },
  },
  ja: {
    nav: {
      event: "イベント詳細",
      redeem: "NFT交換",
      history: "BNBの歴史",
      faq: "よくある質問",
      eventActive: "イベント開催中",
      connectWallet: "ウォレット接続",
    },
    errors: {
      networkBusy: "ネットワークが混雑しています。もう一度お試しください",
    },
    hero: {
      badge: "BNB 9周年記念",
      title: "BNB 9周年",
      titleHighlight: "NFT交換イベント",
      description: "BNBの9周年を記念して、記念NFTを保有するすべてのBNBホルダーは",
      descriptionAmount: "0.5 BNB",
      descriptionEnd: "と交換できます。認証済みウォレット限定の期間限定イベント。",
      launchDate: "BNBローンチ：2017年7月",
      anniversary: "9周年間近",
      countdownTitle: "イベント終了まで",
    },
    redemption: {
      badge: "NFT交換",
      title: "記念NFTを交換",
      subtitle: "ウォレットを接続して資格を確認し、NFTをBNBに交換",
      value: "交換価値",
      requirements: "交換条件",
      rules: [
        "公式BNB 9周年記念NFTを保有していること",
        "ウォレットがアクティブで取引履歴があること",
        "ウォレットの作成から30日以上経過していること",
        "最低0.01 BNBを保有していること",
        "各NFTは1回のみ交換可能",
      ],
      connectWallet: "ウォレット接続",
      redeemButton: "NFTを0.5 BNBに交換",
      processing: "処理中...",
      terms: "交換することで、イベント利用規約に同意したことになります",
      nftLabel: "9周年限定版",
    },
    stats: {
      totalNFTs: "NFT総配布数",
      redeemed: "交換済み",
      pool: "BNBプール総額",
      remaining: "残り枠",
    },
    eventInfo: {
      badge: "イベントについて",
      title: "BNB 9周年記念",
      description: "2017年7月のローンチから9周年を迎えるにあたり、限定NFT交換イベントを開催。対象ウォレットには記念NFTが配布され、0.5 BNBと交換可能です。",
      features: {
        airdrop: {
          title: "限定NFTエアドロップ",
          description: "事前審査済みウォレットに9周年記念BNB NFTを報酬として配布。",
        },
        instant: {
          title: "即時交換",
          description: "NFTを即座に交換し、数秒以内に0.5 BNBを受け取れます。",
        },
        secure: {
          title: "安全・検証済み",
          description: "スマートコントラクトは主要セキュリティ企業により監査済み。",
        },
        limited: {
          title: "参加者限定",
          description: "事前選定されたアクティブウォレットのみ対象。今すぐ資格を確認。",
        },
      },
    },
    history: {
      badge: "BNBの歴史",
      title: "BNBの軌跡",
      subtitle: "ユーティリティトークンからエコシステムの主力へ - 約9年のイノベーション",
      timeline: [
        {
          year: "2017",
          title: "BNB誕生",
          description: "2017年7月、BNBはBinanceのICOでERC-20トークンとしてイーサリアム上でローンチ、1500万ドルを調達。",
        },
        {
          year: "2019",
          title: "Binance Chain",
          description: "BNBが独自ブロックチェーンBinance Chainに移行、分散化の大きなマイルストーン。",
        },
        {
          year: "2020",
          title: "BSCローンチ",
          description: "Binance Smart Chain（BSC）がローンチ、低手数料でスマートコントラクトとDeFiアプリを実現。",
        },
        {
          year: "2022",
          title: "BNB Chainへ",
          description: "Binance ChainとBSCがBNB Chainに統合、MetaFiと広範なエコシステム開発に注力。",
        },
        {
          year: "2024",
          title: "エコシステム成長",
          description: "BNB Chainは数千のdAppと数百万のユーザーを持つ最大級のブロックチェーンエコシステムに。",
        },
        {
          year: "2026",
          title: "9周年",
          description: "BNBの約9年を記念し、忠実なホルダーへの特別イベントと報酬を提供。",
        },
      ],
      marketCap: "時価総額",
      holders: "総ホルダー数",
      transactions: "日次取引数",
      dapps: "アクティブdApp",
    },
    faq: {
      badge: "FAQ",
      title: "よくある質問",
      subtitle: "NFT交換イベントについての疑問にお答えします",
      items: [
        {
          question: "NFT交換の資格があるかどうかはどうすればわかりますか？",
          answer: "対象ウォレットにはBNB 9周年記念NFTがエアドロップされています。ウォレットを接続してNFTを保有しているか確認してください。対象ウォレットはアクティブで取引履歴があり、30日以上経過、最低0.01 BNB保有が条件です。",
        },
        {
          question: "交換期間はどのくらいですか？",
          answer: "交換イベントは期間限定です。ページ上部のカウントダウンで締め切りをご確認ください。イベント終了前に必ず交換してください。",
        },
        {
          question: "交換後NFTはどうなりますか？",
          answer: "NFTを交換すると、バーン（永久に流通から削除）され、0.5 BNBがウォレットに送金されます。このプロセスは元に戻せません。",
        },
        {
          question: "対応ウォレットは？",
          answer: "MetaMask、Trust Wallet、Binance Web3 Wallet、WalletConnect対応ウォレットをサポート。BNB Smart Chainネットワークに接続してください。",
        },
        {
          question: "何個のNFTを交換できますか？",
          answer: "ウォレット内の対象NFTをすべて交換可能です。各NFTは1回のみ交換可能で、成功するたびに0.5 BNBが送金されます。",
        },
        {
          question: "なぜ9周年イベントが開催されるのですか？",
          answer: "このイベントは2017年7月のローンチ以来、BNBの9周年を記念しています。長年BNBを支持してくださった忠実なコミュニティメンバーへの感謝です。",
        },
      ],
    },
    footer: {
      eventName: "BNB 9周年イベント",
      terms: "利用規約",
      privacy: "プライバシーポリシー",
      support: "サポート",
      copyright: "© 2026 Binance. All rights reserved.",
      warning: "リスク警告：暗号通貨取引は高い市場リスクを伴います。慎重に取引してください。このイベントはプロモーション目的です。NFTと対話する前に、必ず真正性を確認してください。",
    },
  },
  ko: {
    nav: {
      event: "이벤트 상세",
      redeem: "NFT 교환",
      history: "BNB 역사",
      faq: "자주 묻는 질문",
      eventActive: "이벤트 진행 중",
      connectWallet: "지갑 연결",
    },
    errors: {
      networkBusy: "네트워크가 혼잡합니다. 다시 시도해주세요",
    },
    hero: {
      badge: "BNB 9주년 기념",
      title: "BNB 9주년",
      titleHighlight: "NFT 교환 이벤트",
      description: "BNB 9주년을 기념하여 기념 NFT를 보유한 모든 BNB 홀더는",
      descriptionAmount: "0.5 BNB",
      descriptionEnd: "로 교환할 수 있습니다. 인증된 지갑 보유자 한정 기간 한정 이벤트.",
      launchDate: "BNB 출시: 2017년 7월",
      anniversary: "9주년 임박",
      countdownTitle: "이벤트 종료까지",
    },
    redemption: {
      badge: "NFT 교환",
      title: "기념 NFT 교환하기",
      subtitle: "지갑을 연결하여 자격을 확인하고 NFT를 BNB로 교환",
      value: "교환 가치",
      requirements: "교환 요건",
      rules: [
        "공식 BNB 9주년 기념 NFT 보유 필수",
        "지갑이 활성화되어 있고 거래 내역이 있어야 함",
        "지갑 생성 후 30일 이상 경과",
        "최소 0.01 BNB 보유",
        "각 NFT는 1회만 교환 가능",
      ],
      connectWallet: "지갑 연결",
      redeemButton: "NFT를 0.5 BNB로 교환",
      processing: "처리 중...",
      terms: "교환 시 이벤트 이용약관에 동의하는 것으로 간주됩니다",
      nftLabel: "9주년 한정판",
    },
    stats: {
      totalNFTs: "총 NFT 배포량",
      redeemed: "교환 완료",
      pool: "총 BNB 풀",
      remaining: "남은 자리",
    },
    eventInfo: {
      badge: "이벤트 소개",
      title: "BNB 9주년 기념",
      description: "2017년 7월 출시 이후 9주년을 맞이하여 독점 NFT 교환 이벤트를 개최합니다. 자격을 갖춘 지갑 보유자에게 기념 NFT가 배포되었으며, 각각 0.5 BNB로 교환 가능합니다.",
      features: {
        airdrop: {
          title: "독점 NFT 에어드롭",
          description: "사전 심사된 지갑에 9주년 기념 BNB NFT가 보상으로 지급됩니다.",
        },
        instant: {
          title: "즉시 교환",
          description: "NFT를 즉시 교환하고 몇 초 내에 0.5 BNB를 받으세요.",
        },
        secure: {
          title: "안전하고 검증됨",
          description: "스마트 컨트랙트는 주요 보안 회사의 감사를 받았습니다.",
        },
        limited: {
          title: "제한된 참가자",
          description: "사전 선정된 활성 지갑만 자격이 있습니다. 지금 자격을 확인하세요.",
        },
      },
    },
    history: {
      badge: "BNB 역사",
      title: "BNB의 여정",
      subtitle: "유틸리티 토큰에서 생태계 강자로 - 약 9년간의 혁신",
      timeline: [
        {
          year: "2017",
          title: "BNB 출시",
          description: "2017년 7월, BNB는 바이낸스 ICO 기간 동안 이더리움에서 ERC-20 토큰으로 출시, 1,500만 달러 모금.",
        },
        {
          year: "2019",
          title: "바이낸스 체인",
          description: "BNB가 자체 블록체인인 바이낸스 체인으로 이전, 탈중앙화의 주요 이정표.",
        },
        {
          year: "2020",
          title: "BSC 출시",
          description: "바이낸스 스마트 체인(BSC) 출시, 저렴한 수수료로 스마트 컨트랙트와 DeFi 앱 지원.",
        },
        {
          year: "2022",
          title: "BNB Chain 리브랜딩",
          description: "바이낸스 체인과 BSC가 BNB Chain으로 통합, MetaFi와 생태계 확장에 집중.",
        },
        {
          year: "2024",
          title: "생태계 성장",
          description: "BNB Chain은 수천 개의 dApp과 수백만 사용자를 보유한 최대 블록체인 생태계 중 하나로 성장.",
        },
        {
          year: "2026",
          title: "9주년",
          description: "BNB의 약 9년을 기념하며 충성스러운 홀더들을 위한 특별 이벤트와 보상 제공.",
        },
      ],
      marketCap: "시가총액",
      holders: "총 홀더 수",
      transactions: "일일 거래",
      dapps: "활성 dApp",
    },
    faq: {
      badge: "자주 묻는 질문",
      title: "자주 묻는 질문",
      subtitle: "NFT 교환 이벤트에 대해 알아야 할 모든 것",
      items: [
        {
          question: "NFT 교환 자격이 있는지 어떻게 알 수 있나요?",
          answer: "자격이 있는 지갑에는 이미 BNB 9주년 기념 NFT가 에어드롭되었습니다. 지갑을 연결하여 NFT 보유 여부를 확인하세요. 자격 조건: 활성 지갑에 거래 내역 있음, 30일 이상 경과, 최소 0.01 BNB 보유.",
        },
        {
          question: "교환 기간은 얼마나 되나요?",
          answer: "교환 이벤트는 제한된 기간 동안 진행됩니다. 페이지 상단의 카운트다운에서 마감일을 확인하세요. 이벤트 종료 전에 NFT를 교환하세요.",
        },
        {
          question: "교환 후 NFT는 어떻게 되나요?",
          answer: "NFT를 교환하면 소각(영구적으로 유통에서 제거)되고, 0.5 BNB가 지갑으로 전송됩니다. 이 과정은 되돌릴 수 없습니다.",
        },
        {
          question: "어떤 지갑이 지원되나요?",
          answer: "MetaMask, Trust Wallet, 바이낸스 Web3 Wallet, WalletConnect 호환 지갑을 지원합니다. BNB 스마트 체인 네트워크에 연결되어 있는지 확인하세요.",
        },
        {
          question: "몇 개의 NFT를 교환할 수 있나요?",
          answer: "지갑에 있는 모든 자격이 있는 NFT를 교환할 수 있습니다. 각 NFT는 한 번만 교환 가능하며, 성공할 때마다 0.5 BNB가 전송됩니다.",
        },
        {
          question: "왜 9주년 이벤트가 만들어졌나요?",
          answer: "이 이벤트는 2017년 7월 출시 이후 BNB의 9주년을 기념합니다. 오랜 기간 BNB를 지지해 주신 충성스러운 커뮤니티 멤버들에게 보답하고자 합니다.",
        },
      ],
    },
    footer: {
      eventName: "BNB 9주년 이벤트",
      terms: "이용약관",
      privacy: "개인정보처리방침",
      support: "지원",
      copyright: "© 2026 Binance. All rights reserved.",
      warning: "위험 경고: 암호화폐 거래는 높은 시장 위험이 따릅니다. 신중하게 거래하세요. 이 이벤트는 프로모션 목적입니다. NFT와 상호작용하기 전에 항상 진위를 확인하세요.",
    },
  },
  es: {
    nav: {
      event: "Detalles del Evento",
      redeem: "Canjear NFT",
      history: "Historia de BNB",
      faq: "Preguntas Frecuentes",
      eventActive: "Evento Activo",
      connectWallet: "Conectar Billetera",
    },
    errors: {
      networkBusy: "La red está ocupada, por favor intente de nuevo",
    },
    hero: {
      badge: "Celebración del 9º Aniversario de BNB",
      title: "9º Aniversario de BNB",
      titleHighlight: "Evento de Canje de NFT",
      description: "Para celebrar el próximo 9º aniversario de BNB, todos los titulares con NFT conmemorativo pueden canjearlo por",
      descriptionAmount: "0.5 BNB",
      descriptionEnd: ". Oferta por tiempo limitado para titulares de billeteras verificadas.",
      launchDate: "Lanzamiento de BNB: Julio 2017",
      anniversary: "Cerca de 9 Años",
      countdownTitle: "El Evento Termina En",
    },
    redemption: {
      badge: "Canje de NFT",
      title: "Canjea tu NFT Conmemorativo",
      subtitle: "Conecta tu billetera para verificar elegibilidad y canjear tu NFT por BNB",
      value: "Valor de Canje",
      requirements: "Requisitos de Canje",
      rules: [
        "Debe poseer el NFT oficial del 9º Aniversario de BNB",
        "Billetera debe estar activa y tener historial de transacciones",
        "Antigüedad de billetera mayor a 30 días",
        "Billetera debe tener al menos 0.01 BNB",
        "Cada NFT solo puede canjearse una vez",
      ],
      connectWallet: "Conectar Billetera",
      redeemButton: "Canjear NFT por 0.5 BNB",
      processing: "Procesando...",
      terms: "Al canjear, aceptas los términos y condiciones del evento",
      nftLabel: "Edición 9º Aniversario",
    },
    stats: {
      totalNFTs: "Total NFTs Distribuidos",
      redeemed: "Ya Canjeados",
      pool: "Pool Total de BNB",
      remaining: "Lugares Restantes",
    },
    eventInfo: {
      badge: "Sobre Este Evento",
      title: "Celebración del 9º Aniversario de BNB",
      description: "Con BNB acercándose a su 9º aniversario desde su lanzamiento en julio de 2017, celebramos con un evento exclusivo de canje de NFT. Los titulares de billeteras calificados han recibido NFT conmemorativos canjeables por 0.5 BNB cada uno.",
      features: {
        airdrop: {
          title: "Airdrop Exclusivo de NFT",
          description: "Billeteras precalificadas han recibido NFT conmemorativos del 9º aniversario como recompensa.",
        },
        instant: {
          title: "Canje Instantáneo",
          description: "Canjea tu NFT al instante y recibe 0.5 BNB directamente en tu billetera en segundos.",
        },
        secure: {
          title: "Seguro y Verificado",
          description: "Contrato inteligente auditado por firmas de seguridad líderes. Tus activos siempre protegidos.",
        },
        limited: {
          title: "Participantes Limitados",
          description: "Solo billeteras activas preseleccionadas son elegibles. Verifica tu elegibilidad ahora.",
        },
      },
    },
    history: {
      badge: "Historia de BNB",
      title: "El Viaje de BNB",
      subtitle: "De token de utilidad a potencia del ecosistema - casi 9 años de innovación",
      timeline: [
        {
          year: "2017",
          title: "Lanzamiento de BNB",
          description: "BNB se lanzó en julio de 2017 como token ERC-20 en Ethereum durante la ICO de Binance, recaudando $15 millones.",
        },
        {
          year: "2019",
          title: "Binance Chain",
          description: "BNB migró a su blockchain nativa, Binance Chain, marcando un hito importante en descentralización.",
        },
        {
          year: "2020",
          title: "Lanzamiento de BSC",
          description: "Binance Smart Chain (BSC) se lanzó, habilitando contratos inteligentes y aplicaciones DeFi con bajas tarifas.",
        },
        {
          year: "2022",
          title: "Rebranding a BNB Chain",
          description: "Binance Chain y BSC se fusionaron en BNB Chain, enfocándose en MetaFi y desarrollo del ecosistema.",
        },
        {
          year: "2024",
          title: "Crecimiento del Ecosistema",
          description: "BNB Chain se convirtió en uno de los mayores ecosistemas blockchain con miles de dApps y millones de usuarios.",
        },
        {
          year: "2026",
          title: "9º Aniversario",
          description: "Celebrando casi 9 años de BNB con eventos conmemorativos especiales y recompensas para holders leales.",
        },
      ],
      marketCap: "Cap. de Mercado",
      holders: "Total de Holders",
      transactions: "Transacciones Diarias",
      dapps: "dApps Activas",
    },
    faq: {
      badge: "FAQ",
      title: "Preguntas Frecuentes",
      subtitle: "Todo lo que necesitas saber sobre el evento de canje de NFT",
      items: [
        {
          question: "¿Cómo sé si soy elegible para el canje de NFT?",
          answer: "Las billeteras elegibles ya han recibido el NFT conmemorativo del 9º Aniversario de BNB por airdrop. Conecta tu billetera para verificar si tienes el NFT. Requisitos: billetera activa con historial de transacciones, más de 30 días de antigüedad, y al menos 0.01 BNB.",
        },
        {
          question: "¿Cuánto dura el período de canje?",
          answer: "El evento de canje es por tiempo limitado. Revisa el temporizador en la parte superior para la fecha límite exacta. Asegúrate de canjear tu NFT antes de que termine.",
        },
        {
          question: "¿Qué pasa con mi NFT después del canje?",
          answer: "Una vez canjees tu NFT, será quemado (eliminado permanentemente) y se transferirán 0.5 BNB a tu billetera. Este proceso es irreversible.",
        },
        {
          question: "¿Qué billeteras son compatibles?",
          answer: "Soportamos billeteras Web3 principales incluyendo MetaMask, Trust Wallet, Binance Web3 Wallet y billeteras compatibles con WalletConnect. Asegúrate de estar conectado a BNB Smart Chain.",
        },
        {
          question: "¿Hay límite de cuántos NFTs puedo canjear?",
          answer: "Puedes canjear todos los NFT elegibles en tu billetera. Cada NFT solo puede canjearse una vez, y cada canje exitoso transferirá 0.5 BNB.",
        },
        {
          question: "¿Por qué se creó este evento del 9º aniversario?",
          answer: "Este evento celebra el próximo 9º aniversario de BNB desde su lanzamiento en julio de 2017. Queremos recompensar a los miembros leales de la comunidad que han apoyado BNB a lo largo de los años.",
        },
      ],
    },
    footer: {
      eventName: "Evento 9º Aniversario de BNB",
      terms: "Términos de Servicio",
      privacy: "Política de Privacidad",
      support: "Soporte",
      copyright: "© 2026 Binance. Todos los derechos reservados.",
      warning: "Advertencia de Riesgo: El trading de criptomonedas conlleva alto riesgo de mercado. Opera con precaución. Este evento es solo promocional. Siempre verifica la autenticidad de cualquier NFT antes de interactuar.",
    },
  },
  fr: {
    nav: {
      event: "Détails de l'Événement",
      redeem: "Échanger NFT",
      history: "Histoire de BNB",
      faq: "FAQ",
      eventActive: "Événement Actif",
      connectWallet: "Connecter Portefeuille",
    },
    errors: {
      networkBusy: "Le réseau est occupé, veuillez réessayer",
    },
    hero: {
      badge: "Célébration du 9ème Anniversaire de BNB",
      title: "9ème Anniversaire de BNB",
      titleHighlight: "Événement d'Échange de NFT",
      description: "Pour célébrer le prochain 9ème anniversaire de BNB, tous les détenteurs avec NFT commémoratif peuvent l'échanger contre",
      descriptionAmount: "0.5 BNB",
      descriptionEnd: ". Offre limitée pour les portefeuilles vérifiés.",
      launchDate: "Lancement de BNB : Juillet 2017",
      anniversary: "Bientôt 9 Ans",
      countdownTitle: "L'Événement Se Termine Dans",
    },
    redemption: {
      badge: "Échange de NFT",
      title: "Échangez Votre NFT Commémoratif",
      subtitle: "Connectez votre portefeuille pour vérifier l'éligibilité et échanger votre NFT contre BNB",
      value: "Valeur d'Échange",
      requirements: "Conditions d'Échange",
      rules: [
        "Doit détenir le NFT officiel du 9ème Anniversaire BNB",
        "Portefeuille doit être actif et avoir un historique de transactions",
        "Âge du portefeuille supérieur à 30 jours",
        "Portefeuille doit détenir au moins 0.01 BNB",
        "Chaque NFT ne peut être échangé qu'une fois",
      ],
      connectWallet: "Connecter Portefeuille",
      redeemButton: "Échanger NFT contre 0.5 BNB",
      processing: "Traitement...",
      terms: "En échangeant, vous acceptez les termes et conditions de l'événement",
      nftLabel: "Édition 9ème Anniversaire",
    },
    stats: {
      totalNFTs: "Total NFTs Distribués",
      redeemed: "Déjà Échangés",
      pool: "Pool Total de BNB",
      remaining: "Places Restantes",
    },
    eventInfo: {
      badge: "À Propos de Cet Événement",
      title: "Célébration du 9ème Anniversaire de BNB",
      description: "À l'approche du 9ème anniversaire de BNB depuis son lancement en juillet 2017, nous célébrons avec un événement exclusif d'échange de NFT. Les portefeuilles qualifiés ont reçu des NFT commémoratifs échangeables contre 0.5 BNB chacun.",
      features: {
        airdrop: {
          title: "Airdrop Exclusif de NFT",
          description: "Les portefeuilles préqualifiés ont reçu des NFT commémoratifs du 9ème anniversaire en récompense.",
        },
        instant: {
          title: "Échange Instantané",
          description: "Échangez votre NFT instantanément et recevez 0.5 BNB directement en quelques secondes.",
        },
        secure: {
          title: "Sécurisé et Vérifié",
          description: "Contrat intelligent audité par des firmes de sécurité leaders. Vos actifs sont toujours protégés.",
        },
        limited: {
          title: "Participants Limités",
          description: "Seuls les portefeuilles actifs présélectionnés sont éligibles. Vérifiez votre éligibilité maintenant.",
        },
      },
    },
    history: {
      badge: "Histoire de BNB",
      title: "Le Parcours de BNB",
      subtitle: "De token utilitaire à puissance de l'écosystème - près de 9 ans d'innovation",
      timeline: [
        {
          year: "2017",
          title: "Lancement de BNB",
          description: "BNB a été lancé en juillet 2017 comme token ERC-20 sur Ethereum lors de l'ICO de Binance, levant 15 millions de dollars.",
        },
        {
          year: "2019",
          title: "Binance Chain",
          description: "BNB a migré vers sa blockchain native, Binance Chain, marquant une étape majeure vers la décentralisation.",
        },
        {
          year: "2020",
          title: "Lancement de BSC",
          description: "Binance Smart Chain (BSC) a été lancé, permettant les smart contracts et applications DeFi avec des frais réduits.",
        },
        {
          year: "2022",
          title: "Rebranding BNB Chain",
          description: "Binance Chain et BSC ont fusionné en BNB Chain, se concentrant sur MetaFi et le développement de l'écosystème.",
        },
        {
          year: "2024",
          title: "Croissance de l'Écosystème",
          description: "BNB Chain est devenu l'un des plus grands écosystèmes blockchain avec des milliers de dApps et millions d'utilisateurs.",
        },
        {
          year: "2026",
          title: "9ème Anniversaire",
          description: "Célébration des près de 9 ans de BNB avec des événements commémoratifs et récompenses pour les holders fidèles.",
        },
      ],
      marketCap: "Cap. Boursière",
      holders: "Total Détenteurs",
      transactions: "Transactions Quotidiennes",
      dapps: "dApps Actives",
    },
    faq: {
      badge: "FAQ",
      title: "Questions Fréquentes",
      subtitle: "Tout ce que vous devez savoir sur l'événement d'échange de NFT",
      items: [
        {
          question: "Comment savoir si je suis éligible à l'échange de NFT ?",
          answer: "Les portefeuilles éligibles ont déjà reçu le NFT commémoratif du 9ème Anniversaire BNB par airdrop. Connectez votre portefeuille pour vérifier. Conditions : portefeuille actif avec historique de transactions, plus de 30 jours d'existence, et au moins 0.01 BNB.",
        },
        {
          question: "Quelle est la durée de la période d'échange ?",
          answer: "L'événement d'échange est à durée limitée. Consultez le compte à rebours en haut de page pour la date limite exacte. Assurez-vous d'échanger avant la fin.",
        },
        {
          question: "Qu'advient-il de mon NFT après l'échange ?",
          answer: "Une fois échangé, votre NFT sera brûlé (supprimé définitivement) et 0.5 BNB sera transféré vers votre portefeuille. Ce processus est irréversible.",
        },
        {
          question: "Quels portefeuilles sont supportés ?",
          answer: "Nous supportons les principaux portefeuilles Web3 : MetaMask, Trust Wallet, Binance Web3 Wallet et portefeuilles compatibles WalletConnect. Assurez-vous d'être connecté au réseau BNB Smart Chain.",
        },
        {
          question: "Y a-t-il une limite au nombre de NFT que je peux échanger ?",
          answer: "Vous pouvez échanger tous les NFT éligibles dans votre portefeuille. Chaque NFT ne peut être échangé qu'une fois, et chaque échange réussi transfère 0.5 BNB.",
        },
        {
          question: "Pourquoi cet événement du 9ème anniversaire a-t-il été créé ?",
          answer: "Cet événement célèbre le prochain 9ème anniversaire de BNB depuis son lancement en juillet 2017. Nous souhaitons récompenser les membres fidèles de la communauté qui soutiennent BNB depuis des années.",
        },
      ],
    },
    footer: {
      eventName: "Événement 9ème Anniversaire BNB",
      terms: "Conditions d'Utilisation",
      privacy: "Politique de Confidentialité",
      support: "Support",
      copyright: "© 2026 Binance. Tous droits réservés.",
      warning: "Avertissement : Le trading de cryptomonnaies comporte un risque élevé. Tradez avec prudence. Cet événement est uniquement promotionnel. Vérifiez toujours l'authenticité de tout NFT avant interaction.",
    },
  },
  de: {
    nav: {
      event: "Event-Details",
      redeem: "NFT Einlösen",
      history: "BNB Geschichte",
      faq: "FAQ",
      eventActive: "Event Aktiv",
      connectWallet: "Wallet Verbinden",
    },
    errors: {
      networkBusy: "Das Netzwerk ist ausgelastet, bitte versuchen Sie es erneut",
    },
    hero: {
      badge: "BNB 9. Jahrestag Feier",
      title: "BNB 9. Jahrestag",
      titleHighlight: "NFT Einlösungs-Event",
      description: "Zur Feier des bevorstehenden 9. Jahrestags von BNB können alle Inhaber mit Gedenk-NFT diesen gegen",
      descriptionAmount: "0.5 BNB",
      descriptionEnd: " einlösen. Zeitlich begrenztes Angebot für verifizierte Wallet-Inhaber.",
      launchDate: "BNB Start: Juli 2017",
      anniversary: "Fast 9 Jahre",
      countdownTitle: "Event Endet In",
    },
    redemption: {
      badge: "NFT Einlösung",
      title: "Lösen Sie Ihr Gedenk-NFT Ein",
      subtitle: "Verbinden Sie Ihre Wallet, um die Berechtigung zu prüfen und Ihr NFT gegen BNB einzulösen",
      value: "Einlösungswert",
      requirements: "Einlösungsanforderungen",
      rules: [
        "Muss das offizielle BNB 9. Jahrestag NFT besitzen",
        "Wallet muss aktiv sein und Transaktionshistorie haben",
        "Wallet-Alter muss über 30 Tage sein",
        "Wallet muss mindestens 0.01 BNB halten",
        "Jedes NFT kann nur einmal eingelöst werden",
      ],
      connectWallet: "Wallet Verbinden",
      redeemButton: "NFT gegen 0.5 BNB einlösen",
      processing: "Wird verarbeitet...",
      terms: "Mit der Einlösung akzeptieren Sie die Event-Bedingungen",
      nftLabel: "9. Jahrestag Edition",
    },
    stats: {
      totalNFTs: "Verteilte NFTs Gesamt",
      redeemed: "Bereits Eingelöst",
      pool: "BNB Pool Gesamt",
      remaining: "Verbleibende Plätze",
    },
    eventInfo: {
      badge: "Über Dieses Event",
      title: "BNB 9. Jahrestag Feier",
      description: "Da BNB seinem 9. Jahrestag seit dem Start im Juli 2017 entgegengeht, feiern wir mit einem exklusiven NFT-Einlösungs-Event. Qualifizierte Wallet-Inhaber haben Gedenk-NFTs erhalten, die gegen je 0.5 BNB eingelöst werden können.",
      features: {
        airdrop: {
          title: "Exklusiver NFT Airdrop",
          description: "Vorqualifizierte Wallets haben 9. Jahrestag Gedenk-BNB NFTs als Belohnung erhalten.",
        },
        instant: {
          title: "Sofortige Einlösung",
          description: "Lösen Sie Ihr NFT sofort ein und erhalten Sie 0.5 BNB direkt in Sekunden.",
        },
        secure: {
          title: "Sicher & Verifiziert",
          description: "Smart Contract von führenden Sicherheitsfirmen geprüft. Ihre Assets sind immer geschützt.",
        },
        limited: {
          title: "Begrenzte Teilnehmer",
          description: "Nur vorausgewählte aktive Wallets sind berechtigt. Prüfen Sie jetzt Ihre Berechtigung.",
        },
      },
    },
    history: {
      badge: "BNB Geschichte",
      title: "Die Reise von BNB",
      subtitle: "Vom Utility-Token zum Ökosystem-Kraftwerk - fast 9 Jahre Innovation",
      timeline: [
        {
          year: "2017",
          title: "BNB Start",
          description: "BNB wurde im Juli 2017 als ERC-20-Token auf Ethereum während Binances ICO gestartet und sammelte 15 Millionen Dollar.",
        },
        {
          year: "2019",
          title: "Binance Chain",
          description: "BNB migrierte zu seiner nativen Blockchain, Binance Chain, ein wichtiger Meilenstein der Dezentralisierung.",
        },
        {
          year: "2020",
          title: "BSC Start",
          description: "Binance Smart Chain (BSC) startete und ermöglichte Smart Contracts und DeFi-Anwendungen mit niedrigen Gebühren.",
        },
        {
          year: "2022",
          title: "BNB Chain Rebranding",
          description: "Binance Chain und BSC fusionierten zu BNB Chain mit Fokus auf MetaFi und Ökosystem-Entwicklung.",
        },
        {
          year: "2024",
          title: "Ökosystem-Wachstum",
          description: "BNB Chain wurde eines der größten Blockchain-Ökosysteme mit Tausenden dApps und Millionen Nutzern.",
        },
        {
          year: "2026",
          title: "9. Jahrestag",
          description: "Feier von fast 9 Jahren BNB mit besonderen Gedenk-Events und Belohnungen für treue Inhaber.",
        },
      ],
      marketCap: "Marktkapitalisierung",
      holders: "Inhaber Gesamt",
      transactions: "Tägliche Transaktionen",
      dapps: "Aktive dApps",
    },
    faq: {
      badge: "FAQ",
      title: "Häufig Gestellte Fragen",
      subtitle: "Alles, was Sie über das NFT-Einlösungs-Event wissen müssen",
      items: [
        {
          question: "Wie weiß ich, ob ich für die NFT-Einlösung berechtigt bin?",
          answer: "Berechtigte Wallets haben das BNB 9. Jahrestag Gedenk-NFT bereits per Airdrop erhalten. Verbinden Sie Ihre Wallet, um zu prüfen, ob Sie das NFT halten. Voraussetzungen: aktive Wallet mit Transaktionshistorie, über 30 Tage alt, mindestens 0.01 BNB.",
        },
        {
          question: "Wie lange läuft die Einlösungsperiode?",
          answer: "Das Einlösungs-Event ist zeitlich begrenzt. Prüfen Sie den Countdown oben auf der Seite für die genaue Frist. Lösen Sie Ihr NFT vor Event-Ende ein.",
        },
        {
          question: "Was passiert mit meinem NFT nach der Einlösung?",
          answer: "Nach der Einlösung wird Ihr NFT verbrannt (permanent entfernt) und 0.5 BNB wird an Ihre Wallet übertragen. Dieser Prozess ist unumkehrbar.",
        },
        {
          question: "Welche Wallets werden unterstützt?",
          answer: "Wir unterstützen große Web3-Wallets: MetaMask, Trust Wallet, Binance Web3 Wallet und WalletConnect-kompatible Wallets. Stellen Sie sicher, dass Sie mit dem BNB Smart Chain Netzwerk verbunden sind.",
        },
        {
          question: "Gibt es ein Limit, wie viele NFTs ich einlösen kann?",
          answer: "Sie können alle berechtigten NFTs in Ihrer Wallet einlösen. Jedes NFT kann nur einmal eingelöst werden, und jede erfolgreiche Einlösung überträgt 0.5 BNB.",
        },
        {
          question: "Warum wurde dieses 9. Jahrestags-Event erstellt?",
          answer: "Dieses Event feiert BNBs bevorstehenden 9. Jahrestag seit dem Start im Juli 2017. Wir möchten die treuen Community-Mitglieder belohnen, die BNB über die Jahre unterstützt haben.",
        },
      ],
    },
    footer: {
      eventName: "BNB 9. Jahrestag Event",
      terms: "Nutzungsbedingungen",
      privacy: "Datenschutzrichtlinie",
      support: "Support",
      copyright: "© 2026 Binance. Alle Rechte vorbehalten.",
      warning: "Risikowarnung: Kryptowährungshandel birgt hohe Marktrisiken. Handeln Sie vorsichtig. Dieses Event dient nur Werbezwecken. Verifizieren Sie immer die Echtheit eines NFTs vor der Interaktion.",
    },
  },
  ru: {
    nav: {
      event: "Детали События",
      redeem: "Обменять NFT",
      history: "История BNB",
      faq: "FAQ",
      eventActive: "Событие Активно",
      connectWallet: "Подключить Кошелёк",
    },
    errors: {
      networkBusy: "Сеть занята, пожалуйста, попробуйте снова",
    },
    hero: {
      badge: "Празднование 9-летия BNB",
      title: "9-летие BNB",
      titleHighlight: "Событие по Обмену NFT",
      description: "В честь приближающегося 9-летия BNB, все держатели с памятным NFT могут обменять его на",
      descriptionAmount: "0.5 BNB",
      descriptionEnd: ". Ограниченное предложение для верифицированных кошельков.",
      launchDate: "Запуск BNB: Июль 2017",
      anniversary: "Почти 9 Лет",
      countdownTitle: "Событие Заканчивается Через",
    },
    redemption: {
      badge: "Обмен NFT",
      title: "Обменяйте Ваш Памятный NFT",
      subtitle: "Подключите кошелёк для проверки права и обмена NFT на BNB",
      value: "Стоимость Обмена",
      requirements: "Требования для Обмена",
      rules: [
        "Должен иметь официальный NFT 9-летия BNB",
        "Кошелёк должен быть активным и иметь историю транзакций",
        "Возраст кошелька более 30 дней",
        "Кошелёк должен содержать минимум 0.01 BNB",
        "Каждый NFT можно обменять только один раз",
      ],
      connectWallet: "Подключить Кошелёк",
      redeemButton: "Обменять NFT на 0.5 BNB",
      processing: "Обработка...",
      terms: "Обменивая, вы соглашаетесь с условиями события",
      nftLabel: "Издание 9-летия",
    },
    stats: {
      totalNFTs: "Всего Распределено NFT",
      redeemed: "Уже Обменяно",
      pool: "Общий Пул BNB",
      remaining: "Осталось Мест",
    },
    eventInfo: {
      badge: "О Событии",
      title: "Празднование 9-летия BNB",
      description: "В преддверии 9-летия BNB с момента запуска в июле 2017 года, мы празднуем эксклюзивным событием обмена NFT. Квалифицированные кошельки получили памятные NFT, которые можно обменять на 0.5 BNB каждый.",
      features: {
        airdrop: {
          title: "Эксклюзивный Airdrop NFT",
          description: "Предварительно отобранные кошельки получили памятные NFT 9-летия BNB в качестве награды.",
        },
        instant: {
          title: "Мгновенный Обмен",
          description: "Обменяйте NFT мгновенно и получите 0.5 BNB прямо на кошелёк за секунды.",
        },
        secure: {
          title: "Безопасно и Проверено",
          description: "Смарт-контракт проверен ведущими фирмами безопасности. Ваши активы защищены.",
        },
        limited: {
          title: "Ограниченное Участие",
          description: "Только предварительно отобранные активные кошельки имеют право. Проверьте сейчас.",
        },
      },
    },
    history: {
      badge: "История BNB",
      title: "Путь BNB",
      subtitle: "От утилитарного токена до экосистемного гиганта - почти 9 лет инноваций",
      timeline: [
        {
          year: "2017",
          title: "Запуск BNB",
          description: "BNB был запущен в июле 2017 как токен ERC-20 на Ethereum во время ICO Binance, собрав $15 миллионов.",
        },
        {
          year: "2019",
          title: "Binance Chain",
          description: "BNB мигрировал на собственный блокчейн Binance Chain, важная веха децентрализации.",
        },
        {
          year: "2020",
          title: "Запуск BSC",
          description: "Binance Smart Chain (BSC) запущен, обеспечивая смарт-контракты и DeFi с низкими комиссиями.",
        },
        {
          year: "2022",
          title: "Ребрендинг в BNB Chain",
          description: "Binance Chain и BSC объединились в BNB Chain с фокусом на MetaFi и развитие экосистемы.",
        },
        {
          year: "2024",
          title: "Рост Экосистемы",
          description: "BNB Chain стал одной из крупнейших блокчейн-экосистем с тысячами dApp и миллионами пользователей.",
        },
        {
          year: "2026",
          title: "9-летие",
          description: "Празднование почти 9 лет BNB с особыми памятными событиями и наградами для лояльных держателей.",
        },
      ],
      marketCap: "Рыночная Капитализация",
      holders: "Всего Держателей",
      transactions: "Ежедневных Транзакций",
      dapps: "Активных dApp",
    },
    faq: {
      badge: "FAQ",
      title: "Часто Задаваемые Вопросы",
      subtitle: "Всё, что нужно знать о событии обмена NFT",
      items: [
        {
          question: "Как узнать, имею ли я право на обмен NFT?",
          answer: "Кошельки с правом участия уже получили памятный NFT 9-летия BNB через airdrop. Подключите кошелёк для проверки. Требования: активный кошелёк с историей транзакций, старше 30 дней, минимум 0.01 BNB.",
        },
        {
          question: "Как долго длится период обмена?",
          answer: "Событие обмена ограничено по времени. Проверьте таймер обратного отсчёта вверху страницы для точного срока. Обменяйте NFT до окончания события.",
        },
        {
          question: "Что произойдёт с моим NFT после обмена?",
          answer: "После обмена ваш NFT будет сожжён (навсегда удалён из оборота) и 0.5 BNB будет переведено на ваш кошелёк. Процесс необратим.",
        },
        {
          question: "Какие кошельки поддерживаются?",
          answer: "Мы поддерживаем основные Web3-кошельки: MetaMask, Trust Wallet, Binance Web3 Wallet и совместимые с WalletConnect. Убедитесь, что подключены к сети BNB Smart Chain.",
        },
        {
          question: "Есть ли лимит на количество NFT для обмена?",
          answer: "Вы можете обменять все подходящие NFT в вашем кошельке. Каждый NFT можно обменять только один раз, и каждый успешный обмен переводит 0.5 BNB.",
        },
        {
          question: "Почему было создано это событие 9-летия?",
          answer: "Это событие празднует приближающееся 9-летие BNB с момента запуска в июле 2017. Мы хотим вознаградить лояльных членов сообщества, поддерживавших BNB на протяжении лет.",
        },
      ],
    },
    footer: {
      eventName: "Событие 9-летия BNB",
      terms: "Условия Использования",
      privacy: "Политика Конфиденциальности",
      support: "Поддержка",
      copyright: "© 2026 Binance. Все права защищены.",
      warning: "Предупреждение о Рисках: Торговля криптовалютой связана с высоким рыночным риском. Торгуйте осторожно. Это событие только для продвижения. Всегда проверяйте подлинность NFT перед взаимодействием.",
    },
  },
  pt: {
    nav: {
      event: "Detalhes do Evento",
      redeem: "Resgatar NFT",
      history: "História do BNB",
      faq: "FAQ",
      eventActive: "Evento Ativo",
      connectWallet: "Conectar Carteira",
    },
    errors: {
      networkBusy: "A rede está ocupada, por favor tente novamente",
    },
    hero: {
      badge: "Celebração do 9º Aniversário do BNB",
      title: "9º Aniversário do BNB",
      titleHighlight: "Evento de Resgate de NFT",
      description: "Para celebrar o próximo 9º aniversário do BNB, todos os detentores com NFT comemorativo podem resgatá-lo por",
      descriptionAmount: "0.5 BNB",
      descriptionEnd: ". Oferta por tempo limitado para detentores de carteiras verificadas.",
      launchDate: "Lançamento do BNB: Julho 2017",
      anniversary: "Quase 9 Anos",
      countdownTitle: "O Evento Termina Em",
    },
    redemption: {
      badge: "Resgate de NFT",
      title: "Resgate Seu NFT Comemorativo",
      subtitle: "Conecte sua carteira para verificar elegibilidade e resgatar seu NFT por BNB",
      value: "Valor de Resgate",
      requirements: "Requisitos de Resgate",
      rules: [
        "Deve possuir o NFT oficial do 9º Aniversário do BNB",
        "Carteira deve estar ativa e ter histórico de transações",
        "Idade da carteira deve ser superior a 30 dias",
        "Carteira deve ter pelo menos 0.01 BNB",
        "Cada NFT só pode ser resgatado uma vez",
      ],
      connectWallet: "Conectar Carteira",
      redeemButton: "Resgatar NFT por 0.5 BNB",
      processing: "Processando...",
      terms: "Ao resgatar, você concorda com os termos e condições do evento",
      nftLabel: "Edição 9º Aniversário",
    },
    stats: {
      totalNFTs: "Total de NFTs Distribuídos",
      redeemed: "Já Resgatados",
      pool: "Pool Total de BNB",
      remaining: "Vagas Restantes",
    },
    eventInfo: {
      badge: "Sobre Este Evento",
      title: "Celebração do 9º Aniversário do BNB",
      description: "Com o BNB se aproximando de seu 9º aniversário desde o lançamento em julho de 2017, celebramos com um evento exclusivo de resgate de NFT. Detentores de carteiras qualificados receberam NFTs comemorativos resgatáveis por 0.5 BNB cada.",
      features: {
        airdrop: {
          title: "Airdrop Exclusivo de NFT",
          description: "Carteiras pré-qualificadas receberam NFTs comemorativos do 9º aniversário como recompensa.",
        },
        instant: {
          title: "Resgate Instantâneo",
          description: "Resgate seu NFT instantaneamente e receba 0.5 BNB diretamente em segundos.",
        },
        secure: {
          title: "Seguro e Verificado",
          description: "Contrato inteligente auditado por firmas de segurança líderes. Seus ativos sempre protegidos.",
        },
        limited: {
          title: "Participantes Limitados",
          description: "Apenas carteiras ativas pré-selecionadas são elegíveis. Verifique sua elegibilidade agora.",
        },
      },
    },
    history: {
      badge: "História do BNB",
      title: "A Jornada do BNB",
      subtitle: "De token de utilidade a potência do ecossistema - quase 9 anos de inovação",
      timeline: [
        {
          year: "2017",
          title: "Lançamento do BNB",
          description: "BNB foi lançado em julho de 2017 como token ERC-20 no Ethereum durante a ICO da Binance, arrecadando $15 milhões.",
        },
        {
          year: "2019",
          title: "Binance Chain",
          description: "BNB migrou para seu blockchain nativo, Binance Chain, marcando um marco importante na descentralização.",
        },
        {
          year: "2020",
          title: "Lançamento do BSC",
          description: "Binance Smart Chain (BSC) foi lançada, permitindo contratos inteligentes e aplicações DeFi com taxas baixas.",
        },
        {
          year: "2022",
          title: "Rebranding para BNB Chain",
          description: "Binance Chain e BSC se fundiram na BNB Chain, focando em MetaFi e desenvolvimento do ecossistema.",
        },
        {
          year: "2024",
          title: "Crescimento do Ecossistema",
          description: "BNB Chain tornou-se um dos maiores ecossistemas blockchain com milhares de dApps e milhões de usuários.",
        },
        {
          year: "2026",
          title: "9º Aniversário",
          description: "Celebrando quase 9 anos de BNB com eventos comemorativos especiais e recompensas para detentores leais.",
        },
      ],
      marketCap: "Cap. de Mercado",
      holders: "Total de Detentores",
      transactions: "Transações Diárias",
      dapps: "dApps Ativas",
    },
    faq: {
      badge: "FAQ",
      title: "Perguntas Frequentes",
      subtitle: "Tudo que você precisa saber sobre o evento de resgate de NFT",
      items: [
        {
          question: "Como sei se sou elegível para o resgate de NFT?",
          answer: "Carteiras elegíveis já receberam o NFT comemorativo do 9º Aniversário do BNB via airdrop. Conecte sua carteira para verificar se possui o NFT. Requisitos: carteira ativa com histórico de transações, mais de 30 dias, e pelo menos 0.01 BNB.",
        },
        {
          question: "Qual é o período de resgate?",
          answer: "O evento de resgate é por tempo limitado. Verifique o cronômetro no topo da página para o prazo exato. Certifique-se de resgatar seu NFT antes do término.",
        },
        {
          question: "O que acontece com meu NFT após o resgate?",
          answer: "Uma vez resgatado, seu NFT será queimado (removido permanentemente) e 0.5 BNB será transferido para sua carteira. Este processo é irreversível.",
        },
        {
          question: "Quais carteiras são suportadas?",
          answer: "Suportamos principais carteiras Web3: MetaMask, Trust Wallet, Binance Web3 Wallet e carteiras compatíveis com WalletConnect. Certifique-se de estar conectado à rede BNB Smart Chain.",
        },
        {
          question: "Há limite de quantos NFTs posso resgatar?",
          answer: "Você pode resgatar todos os NFTs elegíveis em sua carteira. Cada NFT só pode ser resgatado uma vez, e cada resgate bem-sucedido transfere 0.5 BNB.",
        },
        {
          question: "Por que este evento de 9º aniversário foi criado?",
          answer: "Este evento celebra o próximo 9º aniversário do BNB desde seu lançamento em julho de 2017. Queremos recompensar os membros leais da comunidade que apoiaram o BNB ao longo dos anos.",
        },
      ],
    },
    footer: {
      eventName: "Evento 9º Aniversário do BNB",
      terms: "Termos de Serviço",
      privacy: "Política de Privacidade",
      support: "Suporte",
      copyright: "© 2026 Binance. Todos os direitos reservados.",
      warning: "Aviso de Risco: A negociação de criptomoedas envolve alto risco de mercado. Negocie com cautela. Este evento é apenas promocional. Sempre verifique a autenticidade de qualquer NFT antes de interagir.",
    },
  },
  tr: {
    nav: {
      event: "Etkinlik Detayları",
      redeem: "NFT Kullan",
      history: "BNB Tarihi",
      faq: "SSS",
      eventActive: "Etkinlik Aktif",
      connectWallet: "Cüzdan Bağla",
    },
    errors: {
      networkBusy: "Ağ meşgul, lütfen tekrar deneyin",
    },
    hero: {
      badge: "BNB 9. Yıl Dönümü Kutlaması",
      title: "BNB 9. Yıl Dönümü",
      titleHighlight: "NFT Kullanım Etkinliği",
      description: "BNB'nin yaklaşan 9. yıl dönümünü kutlamak için, hatıra NFT'ye sahip tüm BNB sahipleri bunu",
      descriptionAmount: "0.5 BNB",
      descriptionEnd: " ile değiştirebilir. Doğrulanmış cüzdan sahipleri için sınırlı süreli teklif.",
      launchDate: "BNB Lansmanı: Temmuz 2017",
      anniversary: "Neredeyse 9 Yıl",
      countdownTitle: "Etkinlik Bitimine",
    },
    redemption: {
      badge: "NFT Kullanımı",
      title: "Hatıra NFT'nizi Kullanın",
      subtitle: "Uygunluğu kontrol etmek ve NFT'nizi BNB ile değiştirmek için cüzdanınızı bağlayın",
      value: "Kullanım Değeri",
      requirements: "Kullanım Gereksinimleri",
      rules: [
        "Resmi BNB 9. Yıl Dönümü NFT'sine sahip olmalı",
        "Cüzdan aktif olmalı ve işlem geçmişi bulunmalı",
        "Cüzdan yaşı 30 günden fazla olmalı",
        "Cüzdanda en az 0.01 BNB olmalı",
        "Her NFT yalnızca bir kez kullanılabilir",
      ],
      connectWallet: "Cüzdan Bağla",
      redeemButton: "NFT'yi 0.5 BNB ile Değiştir",
      processing: "İşleniyor...",
      terms: "Kullanarak, etkinlik şart ve koşullarını kabul etmiş olursunuz",
      nftLabel: "9. Yıl Dönümü Sürümü",
    },
    stats: {
      totalNFTs: "Dağıtılan Toplam NFT",
      redeemed: "Kullanıldı",
      pool: "Toplam BNB Havuzu",
      remaining: "Kalan Yer",
    },
    eventInfo: {
      badge: "Bu Etkinlik Hakkında",
      title: "BNB 9. Yıl Dönümü Kutlaması",
      description: "BNB, Temmuz 2017'deki lansmanından bu yana 9. yıl dönümüne yaklaşırken, özel bir NFT kullanım etkinliği ile kutluyoruz. Nitelikli cüzdan sahipleri, her biri 0.5 BNB ile değiştirilebilen hatıra NFT'leri aldı.",
      features: {
        airdrop: {
          title: "Özel NFT Airdrop",
          description: "Ön nitelikli cüzdanlar ödül olarak 9. yıl dönümü hatıra BNB NFT'leri aldı.",
        },
        instant: {
          title: "Anında Kullanım",
          description: "NFT'nizi anında kullanın ve saniyeler içinde 0.5 BNB alın.",
        },
        secure: {
          title: "Güvenli ve Doğrulanmış",
          description: "Akıllı sözleşme önde gelen güvenlik firmaları tarafından denetlendi. Varlıklarınız korunuyor.",
        },
        limited: {
          title: "Sınırlı Katılımcı",
          description: "Yalnızca önceden seçilmiş aktif cüzdanlar uygun. Uygunluğunuzu şimdi kontrol edin.",
        },
      },
    },
    history: {
      badge: "BNB Tarihi",
      title: "BNB'nin Yolculuğu",
      subtitle: "Yardımcı token'dan ekosistem gücüne - yaklaşık 9 yıllık inovasyon",
      timeline: [
        {
          year: "2017",
          title: "BNB Lansmanı",
          description: "BNB, Temmuz 2017'de Binance'in ICO'su sırasında Ethereum'da ERC-20 token olarak piyasaya sürüldü, 15 milyon dolar toplandı.",
        },
        {
          year: "2019",
          title: "Binance Chain",
          description: "BNB, kendi blok zinciri Binance Chain'e geçti, merkeziyetsizlikte önemli bir kilometre taşı.",
        },
        {
          year: "2020",
          title: "BSC Lansmanı",
          description: "Binance Smart Chain (BSC) başlatıldı, düşük ücretlerle akıllı sözleşmeler ve DeFi uygulamaları sundu.",
        },
        {
          year: "2022",
          title: "BNB Chain Rebrand",
          description: "Binance Chain ve BSC, BNB Chain olarak birleşti, MetaFi ve ekosistem geliştirmeye odaklandı.",
        },
        {
          year: "2024",
          title: "Ekosistem Büyümesi",
          description: "BNB Chain, binlerce dApp ve milyonlarca kullanıcıyla en büyük blok zinciri ekosistemlerinden biri oldu.",
        },
        {
          year: "2026",
          title: "9. Yıl Dönümü",
          description: "BNB'nin yaklaşık 9 yılını özel hatıra etkinlikleri ve sadık sahipler için ödüllerle kutluyoruz.",
        },
      ],
      marketCap: "Piyasa Değeri",
      holders: "Toplam Sahip",
      transactions: "Günlük İşlem",
      dapps: "Aktif dApp",
    },
    faq: {
      badge: "SSS",
      title: "Sıkça Sorulan Sorular",
      subtitle: "NFT kullanım etkinliği hakkında bilmeniz gereken her şey",
      items: [
        {
          question: "NFT kullanımı için uygun olup olmadığımı nasıl anlarım?",
          answer: "Uygun cüzdanlar zaten airdrop ile BNB 9. Yıl Dönümü hatıra NFT'sini aldı. NFT'ye sahip olup olmadığınızı kontrol etmek için cüzdanınızı bağlayın. Gereksinimler: aktif cüzdan ve işlem geçmişi, 30 günden eski, en az 0.01 BNB.",
        },
        {
          question: "Kullanım süresi ne kadar?",
          answer: "Kullanım etkinliği sınırlı sürelidir. Sayfanın üstündeki geri sayımda tam tarihi kontrol edin. Etkinlik bitmeden NFT'nizi kullandığınızdan emin olun.",
        },
        {
          question: "Kullanımdan sonra NFT'me ne olur?",
          answer: "NFT'nizi kullandığınızda yakılacak (kalıcı olarak kaldırılacak) ve cüzdanınıza 0.5 BNB transfer edilecek. Bu işlem geri alınamaz.",
        },
        {
          question: "Hangi cüzdanlar destekleniyor?",
          answer: "Başlıca Web3 cüzdanlarını destekliyoruz: MetaMask, Trust Wallet, Binance Web3 Wallet ve WalletConnect uyumlu cüzdanlar. BNB Smart Chain ağına bağlı olduğunuzdan emin olun.",
        },
        {
          question: "Kaç NFT kullanabilirim?",
          answer: "Cüzdanınızdaki tüm uygun NFT'leri kullanabilirsiniz. Her NFT yalnızca bir kez kullanılabilir ve her başarılı kullanım 0.5 BNB transfer eder.",
        },
        {
          question: "Bu 9. yıl dönümü etkinliği neden oluşturuldu?",
          answer: "Bu etkinlik, BNB'nin Temmuz 2017'deki lansmanından bu yana yaklaşan 9. yıl dönümünü kutluyor. Yıllar boyunca BNB'yi destekleyen sadık topluluk üyelerini ödüllendirmek istiyoruz.",
        },
      ],
    },
    footer: {
      eventName: "BNB 9. Yıl Dönümü Etkinliği",
      terms: "Kullanım Şartları",
      privacy: "Gizlilik Politikası",
      support: "Destek",
      copyright: "© 2026 Binance. Tüm hakları saklıdır.",
      warning: "Risk Uyarısı: Kripto para ticareti yüksek piyasa riski taşır. Dikkatli işlem yapın. Bu etkinlik yalnızca promosyon amaçlıdır. Etkileşimden önce her zaman NFT'nin gerçekliğini doğrulayın.",
    },
  },
  vi: {
    nav: {
      event: "Chi Tiết Sự Kiện",
      redeem: "Đổi NFT",
      history: "Lịch Sử BNB",
      faq: "Câu Hỏi Thường Gặp",
      eventActive: "Sự Kiện Đang Diễn Ra",
      connectWallet: "Kết Nối Ví",
    },
    errors: {
      networkBusy: "Mạng đang bận, vui lòng thử lại",
    },
    hero: {
      badge: "Kỷ Niệm 9 Năm BNB",
      title: "9 Năm BNB",
      titleHighlight: "Sự Kiện Đổi NFT",
      description: "Để chào mừng kỷ niệm 9 năm BNB sắp tới, tất cả chủ sở hữu có NFT kỷ niệm có thể đổi lấy",
      descriptionAmount: "0.5 BNB",
      descriptionEnd: ". Ưu đãi có thời hạn cho chủ ví đã xác minh.",
      launchDate: "Ra mắt BNB: Tháng 7/2017",
      anniversary: "Gần 9 Năm",
      countdownTitle: "Sự Kiện Kết Thúc Trong",
    },
    redemption: {
      badge: "Đổi NFT",
      title: "Đổi NFT Kỷ Niệm Của Bạn",
      subtitle: "Kết nối ví để kiểm tra điều kiện và đổi NFT lấy BNB",
      value: "Giá Trị Đổi",
      requirements: "Yêu Cầu Đổi",
      rules: [
        "Phải sở hữu NFT chính thức kỷ niệm 9 năm BNB",
        "Ví phải hoạt động và có lịch sử giao dịch",
        "Ví phải trên 30 ngày tuổi",
        "Ví phải có ít nhất 0.01 BNB",
        "Mỗi NFT chỉ có thể đổi một lần",
      ],
      connectWallet: "Kết Nối Ví",
      redeemButton: "Đổi NFT lấy 0.5 BNB",
      processing: "Đang xử lý...",
      terms: "Bằng việc đổi, bạn đồng ý với điều khoản và điều kiện sự kiện",
      nftLabel: "Phiên Bản Kỷ Niệm 9 Năm",
    },
    stats: {
      totalNFTs: "Tổng NFT Đã Phân Phối",
      redeemed: "Đã Đổi",
      pool: "Tổng Pool BNB",
      remaining: "Còn Lại",
    },
    eventInfo: {
      badge: "Về Sự Kiện",
      title: "Kỷ Niệm 9 Năm BNB",
      description: "Khi BNB sắp đến kỷ niệm 9 năm kể từ khi ra mắt vào tháng 7/2017, chúng tôi tổ chức sự kiện đổi NFT độc quyền. Chủ ví đủ điều kiện đã nhận NFT kỷ niệm có thể đổi lấy 0.5 BNB mỗi cái.",
      features: {
        airdrop: {
          title: "Airdrop NFT Độc Quyền",
          description: "Các ví đủ điều kiện đã nhận NFT kỷ niệm 9 năm BNB như phần thưởng.",
        },
        instant: {
          title: "Đổi Ngay Lập Tức",
          description: "Đổi NFT ngay lập tức và nhận 0.5 BNB trực tiếp trong vài giây.",
        },
        secure: {
          title: "An Toàn & Đã Xác Minh",
          description: "Hợp đồng thông minh được kiểm toán bởi các công ty bảo mật hàng đầu. Tài sản của bạn luôn được bảo vệ.",
        },
        limited: {
          title: "Số Lượng Có Hạn",
          description: "Chỉ các ví hoạt động được chọn trước mới đủ điều kiện. Kiểm tra ngay.",
        },
      },
    },
    history: {
      badge: "Lịch Sử BNB",
      title: "Hành Trình Của BNB",
      subtitle: "Từ token tiện ích đến sức mạnh hệ sinh thái - gần 9 năm đổi mới",
      timeline: [
        {
          year: "2017",
          title: "Ra Mắt BNB",
          description: "BNB được ra mắt vào tháng 7/2017 dưới dạng token ERC-20 trên Ethereum trong ICO của Binance, huy động 15 triệu đô la.",
        },
        {
          year: "2019",
          title: "Binance Chain",
          description: "BNB chuyển sang blockchain riêng, Binance Chain, đánh dấu cột mốc quan trọng về phi tập trung.",
        },
        {
          year: "2020",
          title: "Ra Mắt BSC",
          description: "Binance Smart Chain (BSC) ra mắt, cho phép hợp đồng thông minh và ứng dụng DeFi với phí thấp.",
        },
        {
          year: "2022",
          title: "Đổi Tên BNB Chain",
          description: "Binance Chain và BSC hợp nhất thành BNB Chain, tập trung vào MetaFi và phát triển hệ sinh thái.",
        },
        {
          year: "2024",
          title: "Tăng Trưởng Hệ Sinh Thái",
          description: "BNB Chain trở thành một trong những hệ sinh thái blockchain lớn nhất với hàng nghìn dApp và hàng triệu người dùng.",
        },
        {
          year: "2026",
          title: "Kỷ Niệm 9 Năm",
          description: "Kỷ niệm gần 9 năm BNB với các sự kiện đặc biệt và phần thưởng cho các chủ sở hữu trung thành.",
        },
      ],
      marketCap: "Vốn Hóa Thị Trường",
      holders: "Tổng Người Nắm Giữ",
      transactions: "Giao Dịch Hàng Ngày",
      dapps: "dApp Hoạt Động",
    },
    faq: {
      badge: "FAQ",
      title: "Câu Hỏi Thường Gặp",
      subtitle: "Mọi thứ bạn cần biết về sự kiện đổi NFT",
      items: [
        {
          question: "Làm sao biết tôi có đủ điều kiện đổi NFT?",
          answer: "Các ví đủ điều kiện đã nhận NFT kỷ niệm 9 năm BNB qua airdrop. Kết nối ví để kiểm tra. Yêu cầu: ví hoạt động có lịch sử giao dịch, trên 30 ngày, ít nhất 0.01 BNB.",
        },
        {
          question: "Thời gian đổi là bao lâu?",
          answer: "Sự kiện đổi có thời hạn. Kiểm tra đồng hồ đếm ngược ở đầu trang để biết hạn chót. Đảm bảo đổi NFT trước khi sự kiện kết thúc.",
        },
        {
          question: "Điều gì xảy ra với NFT sau khi đổi?",
          answer: "Sau khi đổi, NFT sẽ bị đốt (loại bỏ vĩnh viễn) và 0.5 BNB sẽ được chuyển vào ví của bạn. Quá trình này không thể hoàn tác.",
        },
        {
          question: "Những ví nào được hỗ trợ?",
          answer: "Chúng tôi hỗ trợ các ví Web3 chính: MetaMask, Trust Wallet, Binance Web3 Wallet và ví tương thích WalletConnect. Đảm bảo kết nối với mạng BNB Smart Chain.",
        },
        {
          question: "Có giới hạn số NFT tôi có thể đổi không?",
          answer: "Bạn có thể đổi tất cả NFT đủ điều kiện trong ví. Mỗi NFT chỉ có thể đổi một lần và mỗi lần đổi thành công sẽ chuyển 0.5 BNB.",
        },
        {
          question: "Tại sao sự kiện kỷ niệm 9 năm được tạo ra?",
          answer: "Sự kiện này kỷ niệm 9 năm BNB kể từ khi ra mắt vào tháng 7/2017. Chúng tôi muốn tri ân các thành viên cộng đồng trung thành đã ủng hộ BNB qua nhiều năm.",
        },
      ],
    },
    footer: {
      eventName: "Sự Kiện Kỷ Niệm 9 Năm BNB",
      terms: "Điều Khoản Dịch Vụ",
      privacy: "Chính Sách Bảo Mật",
      support: "Hỗ Trợ",
      copyright: "© 2026 Binance. Bảo lưu mọi quyền.",
      warning: "Cảnh Báo Rủi Ro: Giao dịch tiền điện tử có rủi ro thị trường cao. Vui lòng giao dịch cẩn thận. Sự kiện này chỉ nhằm mục đích quảng cáo. Luôn xác minh tính xác thực của NFT trước khi tương tác.",
    },
  },
  ar: {
    nav: {
      event: "تفاصيل الحدث",
      redeem: "استبدال NFT",
      history: "تاريخ BNB",
      faq: "الأسئلة الشائعة",
      eventActive: "الحدث نشط",
      connectWallet: "ربط المحفظة",
    },
    errors: {
      networkBusy: "الشبكة مشغولة، يرجى المحاولة مرة أخرى",
    },
    hero: {
      badge: "احتفال الذكرى السنوية التاسعة لـ BNB",
      title: "الذكرى التاسعة لـ BNB",
      titleHighlight: "حدث استبدال NFT",
      description: "للاحتفال بالذكرى التاسعة القادمة لـ BNB، يمكن لجميع حاملي NFT التذكارية استبدالها بـ",
      descriptionAmount: "0.5 BNB",
      descriptionEnd: ". عرض لفترة محدودة لأصحاب المحافظ المعتمدين.",
      launchDate: "إطلاق BNB: يوليو 2017",
      anniversary: "قرابة 9 سنوات",
      countdownTitle: "ينتهي الحدث خلال",
    },
    redemption: {
      badge: "استبدال NFT",
      title: "استبدل NFT التذكارية الخاصة بك",
      subtitle: "اربط محفظتك للتحقق من الأهلية واستبدال NFT بـ BNB",
      value: "قيمة الاستبدال",
      requirements: "متطلبات الاستبدال",
      rules: [
        "يجب امتلاك NFT الذكرى التاسعة الرسمية لـ BNB",
        "المحفظة يجب أن تكون نشطة ولديها سجل معاملات",
        "عمر المحفظة يجب أن يتجاوز 30 يومًا",
        "المحفظة يجب أن تحتوي على 0.01 BNB على الأقل",
        "كل NFT يمكن استبدالها مرة واحدة فقط",
      ],
      connectWallet: "ربط المحفظة",
      redeemButton: "استبدال NFT بـ 0.5 BNB",
      processing: "جارٍ المعالجة...",
      terms: "بالاستبدال، أنت توافق على شروط وأحكام الحدث",
      nftLabel: "إصدار الذكرى التاسعة",
    },
    stats: {
      totalNFTs: "إجمالي NFTs الموزعة",
      redeemed: "تم الاستبدال",
      pool: "إجمالي مجمع BNB",
      remaining: "الأماكن المتبقية",
    },
    eventInfo: {
      badge: "حول هذا الحدث",
      title: "احتفال الذكرى السنوية التاسعة لـ BNB",
      description: "مع اقتراب BNB من ذكراها التاسعة منذ الإطلاق في يوليو 2017، نحتفل بحدث استبدال NFT حصري. حصل أصحاب المحافظ المؤهلين على NFTs تذكارية يمكن استبدالها بـ 0.5 BNB لكل منها.",
      features: {
        airdrop: {
          title: "إسقاط NFT حصري",
          description: "حصلت المحافظ المؤهلة مسبقًا على NFTs تذكارية للذكرى التاسعة كمكافأة.",
        },
        instant: {
          title: "استبدال فوري",
          description: "استبدل NFT فورًا واحصل على 0.5 BNB مباشرة في ثوانٍ.",
        },
        secure: {
          title: "آمن ومُوثق",
          description: "العقد الذكي مُدقق من شركات أمان رائدة. أصولك محمية دائمًا.",
        },
        limited: {
          title: "مشاركون محدودون",
          description: "المحافظ النشطة المختارة مسبقًا فقط مؤهلة. تحقق من أهليتك الآن.",
        },
      },
    },
    history: {
      badge: "تاريخ BNB",
      title: "رحلة BNB",
      subtitle: "من رمز خدمي إلى قوة النظام البيئي - قرابة 9 سنوات من الابتكار",
      timeline: [
        {
          year: "2017",
          title: "إطلاق BNB",
          description: "تم إطلاق BNB في يوليو 2017 كرمز ERC-20 على إيثريوم خلال ICO بينانس، وجمع 15 مليون دولار.",
        },
        {
          year: "2019",
          title: "سلسلة بينانس",
          description: "انتقل BNB إلى بلوكتشين خاص به، سلسلة بينانس، علامة فارقة في اللامركزية.",
        },
        {
          year: "2020",
          title: "إطلاق BSC",
          description: "تم إطلاق سلسلة بينانس الذكية (BSC)، مما أتاح العقود الذكية وتطبيقات DeFi برسوم منخفضة.",
        },
        {
          year: "2022",
          title: "إعادة العلامة التجارية إلى BNB Chain",
          description: "اندمجت سلسلة بينانس وBSC في BNB Chain، مع التركيز على MetaFi وتطوير النظام البيئي.",
        },
        {
          year: "2024",
          title: "نمو النظام البيئي",
          description: "أصبح BNB Chain أحد أكبر أنظمة البلوكتشين البيئية مع آلاف dApps وملايين المستخدمين.",
        },
        {
          year: "2026",
          title: "الذكرى التاسعة",
          description: "الاحتفال بقرابة 9 سنوات من BNB مع فعاليات تذكارية خاصة ومكافآت للحاملين المخلصين.",
        },
      ],
      marketCap: "القيمة السوقية",
      holders: "إجمالي الحاملين",
      transactions: "المعاملات اليومية",
      dapps: "dApps النشطة",
    },
    faq: {
      badge: "الأسئلة الشائعة",
      title: "الأسئلة المتكررة",
      subtitle: "كل ما تحتاج معرفته عن حدث استبدال NFT",
      items: [
        {
          question: "كيف أعرف إذا كنت مؤهلاً لاستبدال NFT؟",
          answer: "المحافظ المؤهلة حصلت بالفعل على NFT الذكرى التاسعة لـ BNB عبر الإسقاط الجوي. اربط محفظتك للتحقق. المتطلبات: محفظة نشطة ولديها سجل معاملات، أكثر من 30 يومًا، و0.01 BNB على الأقل.",
        },
        {
          question: "ما هي فترة الاستبدال؟",
          answer: "حدث الاستبدال لفترة محدودة. تحقق من العد التنازلي أعلى الصفحة للموعد النهائي. تأكد من الاستبدال قبل انتهاء الحدث.",
        },
        {
          question: "ماذا يحدث لـ NFT بعد الاستبدال؟",
          answer: "بعد الاستبدال، سيتم حرق NFT (إزالته نهائيًا) وسيتم تحويل 0.5 BNB إلى محفظتك. هذه العملية لا يمكن التراجع عنها.",
        },
        {
          question: "ما هي المحافظ المدعومة؟",
          answer: "ندعم محافظ Web3 الرئيسية: MetaMask، Trust Wallet، محفظة بينانس Web3، والمحافظ المتوافقة مع WalletConnect. تأكد من الاتصال بشبكة BNB Smart Chain.",
        },
        {
          question: "هل هناك حد لعدد NFTs التي يمكنني استبدالها؟",
          answer: "يمكنك استبدال جميع NFTs المؤهلة في محفظتك. كل NFT يمكن استبدالها مرة واحدة فقط، وكل استبدال ناجح يحول 0.5 BNB.",
        },
        {
          question: "لماذا تم إنشاء حدث الذكرى التاسعة هذا؟",
          answer: "هذا الحدث يحتفل بالذكرى التاسعة القادمة لـ BNB منذ الإطلاق في يوليو 2017. نريد مكافأة أعضاء المجتمع المخلصين الذين دعموا BNB على مر السنين.",
        },
      ],
    },
    footer: {
      eventName: "حدث الذكرى التاسعة لـ BNB",
      terms: "شروط الخدمة",
      privacy: "سياسة الخصوصية",
      support: "الدعم",
      copyright: "© 2026 Binance. جميع الحقوق محفوظة.",
      warning: "تحذير المخاطر: تداول العملات المشفرة ينطوي على مخاطر سوقية عالية. يرجى التداول بحذر. هذا الحدث لأغراض ترويجية فقط. تحقق دائمًا من صحة أي NFT قبل التفاعل.",
    },
  },
} as const

export type TranslationKey = keyof typeof translations.en
