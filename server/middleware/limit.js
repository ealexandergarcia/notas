const rateLimit = require("express-rate-limit");

const botsUserAgents = [
  "Prerender",
  "Googlebot",
  "Google\\+",
  "bingbot",
  "Googlebot-Mobile",
  "seochat",
  "SemrushBot",
  "SemrushBot-SA",
  "Bot",
  "SEOChat",
  "Baiduspider",
  "Yahoo",
  "YahooSeeker",
  "DoCoMo",
  "Twitterbot",
  "TweetmemeBot",
  "Twikle",
  "Netseer",
  "Daumoa",
  "SeznamBot",
  "Ezooms",
  "MSNBot",
  "Exabot",
  "MJ12bot",
  "sogou\\sspider",
  "YandexBot",
  "bitlybot",
  "ia_archiver",
  "proximic",
  "spbot",
  "ChangeDetection",
  "NaverBot",
  "MetaJobBot",
  "magpie-crawler",
  "Genieo\\sWeb\\sfilter",
  "Qualidator.com\\sBot",
  "Woko",
  "Vagabondo",
  "360Spider",
  "ExB\\sLanguage\\sCrawler",
  "AddThis.com",
  "aiHitBot",
  "Spinn3r",
  "BingPreview",
  "GrapeshotCrawler",
  "CareerBot",
  "ZumBot",
  "ShopWiki",
  "bixocrawler",
  "uMBot",
  "sistrix",
  "linkdexbot",
  "AhrefsBot",
  "archive.org_bot",
  "SeoCheckBot",
  "TurnitinBot",
  "VoilaBot",
  "SearchmetricsBot",
  "Butterfly",
  "Yahoo!",
  "Plukkie",
  "yacybot",
  "trendictionbot",
  "UASlinkChecker",
  "Blekkobot",
  "Wotbox",
  "YioopBot",
  "meanpathbot",
  "TinEye",
  "LuminateBot",
  "FyberSpider",
  "Infohelfer",
  "linkdex.com",
  "Curious\\sGeorge",
  "Fetch-Guess",
  "ichiro",
  "MojeekBot",
  "SBSearch",
  "WebThumbnail",
  "socialbm_bot",
  "SemrushBot",
  "Vedma",
  "alexa\\ssite\\saudit",
  "SEOkicks-Robot",
  "Browsershots",
  "BLEXBot",
  "woriobot",
  "AMZNKAssocBot",
  "Speedy",
  "oBot",
  "HostTracker",
  "OpenWebSpider",
  "WBSearchBot",
  "FacebookExternalHit",
  "Google-Structured-Data-Testing-Tool",
  "baiduspider",
  "facebookexternalhit",
  "twitterbot",
  "rogerbot",
  "linkedinbot",
  "embedly",
  "quora\\slink\\spreview",
  "showyoubot",
  "outbrain",
  "pinterest",
  "slackbot",
  "vkShare",
  "W3C_Validator",
];

const createRateLimitHandler = (max, windowMs, customMessage) => {
    return rateLimit({
      windowMs,
      max,
      handler: (req, res) => {
        const userAgent = req.get("User-Agent");
        if (
          userAgent &&
          botsUserAgents.some((bot) => new RegExp(bot, "i").test(userAgent))
        ) {
          return res.status(403).json({
            status: 403,
            message: "Do not allow bot requests",
          });
        }
        res.status(429).json({
          status: 429,
          message: customMessage,
        });
      },
    });
  };
  
  exports.limit = (method) => {
    let windowMs, max, message;
  
    switch (method) {
      case "login": // Specific case for login
        windowMs = 3 * 60 * 1000; // 3 minutes
        max = 3;
        message = "Espera 3 minutos antes de volver a intentarlo.";
        break;
      case "get":
        windowMs = 15 * 60 * 1000; // 15 minutes
        max = 25;
        message = "Tasa superada. Por favor, intenta de nuevo más tarde.";
        break;
      case "post":
        windowMs = 15 * 60 * 1000; // 15 minutes
        max = 45;
        message = "Tasa superada. Por favor, intenta de nuevo más tarde.";
        break;
      case "delete":
        windowMs = 10 * 60 * 1000; // 10 minutes
        max = 10;
        message = "Tasa superada. Por favor, intenta de nuevo más tarde.";
        break;
      case "put":
        windowMs = 15 * 60 * 1000; // 15 minutes
        max = 45;
        message = "Tasa superada. Por favor, intenta de nuevo más tarde.";
        break;
      default:
        windowMs = 15 * 60 * 1000; // 15 minutes
        max = 25;
        message = "Tasa superada. Por favor, intenta de nuevo más tarde.";
        break;
    }
  
    return createRateLimitHandler(max, windowMs, message);
  };