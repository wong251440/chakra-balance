(function () {
  "use strict";

  const STORAGE_KEY = "chakra-balance-assessment-v1";
  const PAGE_SIZE = 10;
  const TYPE_LABELS = {
    balanced: "平衡題",
    deficit: "閉塞題",
    excess: "過度題",
    validity: "檢核題",
  };

  const CHAKRA_META = {
    root: {
      name: "海底輪",
      english: "Root",
      focus: "安全、落地、現實承載",
      resource: "能維持身體感、現實節奏與面對生活責任的承載力",
      blockTheme: "容易抽離現實、忽略身體訊號，或在壓力下先退縮保命",
      excessTheme: "容易過度警戒、緊抓穩定與資源，對變動反應過強",
      practice: "可以先輕輕整理睡眠、飲食、金錢、住處與身體節律，讓安全感慢慢回到可感知的現實層",
      affirmation: "你不需要一下子完全放鬆，只要一點一點回到身體，安全感就會開始長回來。",
      feelings: {
        balanced: "你比較能感覺自己是站在地上的，日子不一定輕鬆，但你知道自己沒有完全失去重心。",
        blocked: "你可能常覺得自己像浮著過日子，事情很多，心卻很難真正落下來。",
        excess: "你可能很難真的鬆開，腦和身體像一直在守夜，隨時準備應對變動。",
        mixed: "你可能一邊想逃開壓力，一邊又很怕失去控制，整個人因此更難安定。",
      },
    },
    sacral: {
      name: "臍輪",
      english: "Sacral",
      focus: "情緒流動、愉悅、親密與創造",
      resource: "能辨認情緒、接住需求，也能讓喜悅與親密自然流動",
      blockTheme: "容易關掉感受、壓抑渴望，或在關係裡不敢讓自己真的被碰到",
      excessTheme: "容易被情緒和依附感牽動，用刺激、快感或連結來填補空缺",
      practice: "可以先溫柔地練習命名情緒與需求，分清楚想要、喜歡、害怕與界線，不急著把感受處理掉",
      affirmation: "你的感受不需要被證明才有資格存在，慢慢感覺得到自己，本身就是修復。",
      feelings: {
        balanced: "你比較能感受到自己的情緒有進有出，親密、快樂與創造也較容易自然流動。",
        blocked: "你可能常把感受收得很深，久了甚至連自己真正想要什麼都不太確定。",
        excess: "你可能很容易被情緒、依附或快感牽著走，當內在空了時會特別想抓住什麼。",
        mixed: "你可能一邊渴望靠近，一邊又怕被捲進去，於是情緒和關係都容易忽近忽遠。",
      },
    },
    solar: {
      name: "太陽神經叢輪",
      english: "Solar Plexus",
      focus: "意志、界線、行動與力量整合",
      resource: "能做決定、維持界線，並把力量用在推進真正重要的事情上",
      blockTheme: "容易自我懷疑、退讓、拖延，或把主導權讓出去之後悶住自己",
      excessTheme: "容易催促、施壓、搶回控制權，靠強勢來維持價值感",
      practice: "可以把力量從證明自己，慢慢轉回清楚選擇與穩定執行，先從小範圍說不與定義界線開始",
      affirmation: "你不必一直很強才值得被尊重，穩穩地站回自己，也是一種力量。",
      feelings: {
        balanced: "你比較能分辨哪些是自己的選擇，哪些只是外界期待，行動時也較有穩定感。",
        blocked: "你可能常常先退讓、懷疑或拖延，真正的意志像被收在很裡面。",
        excess: "你可能會不自覺地加快、撐住、搶回主導，彷彿只要一停下來就會失去力量。",
        mixed: "你可能一邊懷疑自己、一邊又逼自己撐住，內在常同時有無力與用力。",
      },
    },
    heart: {
      name: "心輪",
      english: "Heart",
      focus: "愛、連結、接受與關係界線",
      resource: "能在關係裡保持溫度、接受善意，也不失去自己的邊界",
      blockTheme: "容易防衛、抽離、不求助，或把受傷後的自己整個關起來",
      excessTheme: "容易過度付出、急著修補、把別人的情緒扛成自己的責任",
      practice: "可以把連結和界線一起練，慢慢分清楚什麼是善意、什麼是拯救，允許自己接收也允許自己拒絕",
      affirmation: "你的柔軟不需要靠過度付出來證明，能被照顧、也能設界線，都是愛的一部分。",
      feelings: {
        balanced: "你比較能在關係裡既保持溫度，也保有自己，不必透過犧牲或抽離來維持連結。",
        blocked: "你可能很想保護自己，不輕易求助，也不太讓人碰到真正受傷的地方。",
        excess: "你可能很習慣先照顧別人、先修補關係，卻不容易把自己放進同等重要的位置。",
        mixed: "你可能一邊很需要靠近，一邊又怕再次受傷，所以常在靠近與抽離之間來回。",
      },
    },
    throat: {
      name: "喉輪",
      english: "Throat",
      focus: "真實表達、傾聽與發聲邊界",
      resource: "能把內在感受翻成清楚表達，同時保有傾聽與回應空間",
      blockTheme: "容易吞回真話、怕衝突，或在需要表達時整個卡住",
      excessTheme: "容易說太多、急著解釋或搶先定義場面，讓真實反而被包住",
      practice: "可以先讓表達變得更短、更真一點，說需求、感受與界線時少修飾一些，也多留一點停頓",
      affirmation: "你的真實不需要完美措辭才值得被聽見，清楚、誠實、緩慢地說，也很有力量。",
      feelings: {
        balanced: "你比較能把心裡真正的意思說出來，同時也容得下對方的聲音。",
        blocked: "你可能常常把重要的話吞回去，等事情過了才想起自己其實很有感受。",
        excess: "你可能一緊張就開始解釋、補充、證明，話很多，但真正想說的反而更難被碰到。",
        mixed: "你可能一邊怕說太多，一邊又怕自己沒被聽見，所以表達常忽快忽慢。",
      },
    },
    thirdEye: {
      name: "眉心輪",
      english: "Third Eye",
      focus: "洞察、辨識、反思與內在清明",
      resource: "能分辨直覺、事實與投射，看見更完整的心理脈絡",
      blockTheme: "容易看不清模式、抓不到原因，或缺少退一步觀察自己的能力",
      excessTheme: "容易過度解讀、把推測當事實，思考越多反而離現場越遠",
      practice: "可以把觀察和驗證放在一起，慢慢記錄感受、事實、推測三者差異，讓清明取代腦補",
      affirmation: "你不用立刻看懂全部，願意停一下、再看一次，清明就會慢慢回來。",
      feelings: {
        balanced: "你比較能看見事情的脈絡，也能分清楚什麼是直覺、什麼是事實、什麼是投射。",
        blocked: "你可能常覺得自己只是一直重複，卻說不上到底是哪裡卡住。",
        excess: "你可能很容易在腦中推演、解讀、延伸，想到很多，卻越想越離當下越遠。",
        mixed: "你可能一邊看不清自己真正的模式，一邊又用很多解釋去填補空白，心會特別累。",
      },
    },
    crown: {
      name: "頂輪",
      english: "Crown",
      focus: "意義、信任、整體感與謙遜",
      resource: "能保持更大的視角與信任感，同時不脫離現實生活",
      blockTheme: "容易失去意義感、對未知關閉，或在混亂時只剩空掉與斷線",
      excessTheme: "容易用靈性、命運或抽象答案跳過現實責任與細節檢查",
      practice: "可以把意義感慢慢落回日常，讓信任和現實行動並行，不用抽離生活來證明自己有連結",
      affirmation: "你不需要現在就明白全部答案，願意留在生活裡、也留在自己身上，就是一種很深的連結。",
      feelings: {
        balanced: "你比較能在不確定裡保持一點信任，知道生命不只剩下眼前的得失。",
        blocked: "你可能常感到空、斷、沒有方向，像和更大的意義感暫時失去了連線。",
        excess: "你可能會想往更高、更遠的答案走，卻因此更難停在眼前真正需要照顧的現實。",
        mixed: "你可能一邊覺得失去意義，一邊又急著找更大的答案來蓋過那份空，心因此更漂。",
      },
    },
  };

  const CHAKRA_SECTIONS = [
    {
      chakraId: "root",
      chakraName: CHAKRA_META.root.name,
      groups: {
        balanced: [
          "我通常能感到自己是穩穩在場的，而不是飄著過日子。",
          "面對日常責任時，我多半能一步一步處理，而不會整個人散掉。",
          "即使外界有變動，我仍保有基本的安定感。",
          "我與自己的身體保持穩定連結，能察覺疲累、飢餓或需要休息。",
          "我不需要時刻擔心最壞情況，才能推動生活前進。",
          "我的作息或生活節奏大致有基本規律。",
        ],
        deficit: [
          "當現實壓力一來，我容易想逃開，而不是面對。",
          "我常覺得自己沒有真正站穩，像是在硬撐生活。",
          "我常忽略身體訊號，直到很不舒服才發現。",
          "一談到金錢、住處或基本保障，我容易覺得無力。",
          "我平常容易失去節奏，基本生活常被我拖到混亂。",
        ],
        excess: [
          "只要事情有一點不確定，我就很難放鬆。",
          "我常為了保住安全感而抓得太緊。",
          "我很難把資源分出去，因為心裡總覺得可能不夠。",
          "當周遭變動時，我會急著把一切控制回原位。",
          "我常因為害怕失去穩定，而不敢嘗試必要的改變。",
        ],
      },
    },
    {
      chakraId: "sacral",
      chakraName: CHAKRA_META.sacral.name,
      groups: {
        balanced: [
          "我能辨認自己當下在感受什麼。",
          "我容許情緒流動，而不急著把它合理化或壓下去。",
          "我能享受愉快經驗，而不會立刻感到不安或內疚。",
          "在親近互動裡，我能靠近別人，也保有自己。",
          "我能直接承認自己的喜歡、不喜歡與渴望。",
          "即使情緒起伏，我通常不會靠外界刺激來麻痺自己。",
        ],
        deficit: [
          "我常不知道自己真正想要的是什麼。",
          "當情緒升起時，我第一反應常是把它關掉。",
          "我很難自在地接收快樂、放鬆或被照顧。",
          "在親密關係裡，我常怕表露感受會帶來麻煩。",
          "我常把需求壓到很後面，久了自己也感覺不到了。",
        ],
        excess: [
          "我的情緒一上來時，常很難留有空間去消化它。",
          "我容易因為寂寞、空虛或失落而想抓住某個人或某種感受。",
          "我常靠吃、買、追求刺激或沉浸某種快感來填補內在空缺。",
          "當我喜歡一個人或一件事時，很容易整個人陷進去。",
          "我會因為害怕失去連結，而讓自己的界線變得很鬆。",
        ],
      },
    },
    {
      chakraId: "solar",
      chakraName: CHAKRA_META.solar.name,
      groups: {
        balanced: [
          "面對重要選擇時，我通常能做出自己的決定。",
          "別人不同意我時，我仍能維持基本穩定。",
          "我能清楚感到哪些事是我想做、哪些不是。",
          "即使不完美，我也能持續推進重要的事。",
          "我能拒絕不適合自己的要求，而不需要先自責很久。",
          "我不需要一直證明自己，才覺得自己有價值。",
        ],
        deficit: [
          "我常把決定權交給別人，之後又悶悶不舒服。",
          "我很容易懷疑自己是否夠好、夠資格。",
          "為了避免衝突，我常把真正立場縮回去。",
          "一遇到阻力，我就容易洩氣或拖延。",
          "被否定或被拒絕時，我很容易整個人垮下來。",
        ],
        excess: [
          "事情不照我想的走時，我會很想把主導權搶回來。",
          "我容易把「我有能力」建立在贏過別人上。",
          "我常在不自覺中替別人決定，覺得這樣比較有效率。",
          "我不太能接受自己示弱或承認做不到。",
          "我會用強硬、催促或施壓來讓事情照我期待前進。",
        ],
      },
    },
    {
      chakraId: "heart",
      chakraName: CHAKRA_META.heart.name,
      groups: {
        balanced: [
          "我能在照顧別人的同時，也照顧自己的需要。",
          "我能真心接收別人的善意，而不急著推開或還回去。",
          "即使曾受傷，我仍保有基本的開放與柔軟。",
          "我對自己犯錯時，多半能保有基本善意。",
          "我與人連結時，通常不需要扮演拯救者或被拯救者。",
          "我能感到溫暖與善意，同時不失去界線。",
        ],
        deficit: [
          "當別人靠近我時，我常本能地防起來。",
          "我很難相信自己值得被真心對待。",
          "受傷之後，我往往會把心關得很緊。",
          "我不太習慣向人求助，哪怕其實很需要。",
          "我常用冷淡、抽離或理性化來避開受傷感。",
        ],
        excess: [
          "我常因為不忍拒絕別人，而讓自己長期耗損。",
          "別人的情緒很容易變成我的責任。",
          "我容易把付出當成維持關係的主要方式。",
          "關係一緊張，我就會急著修補，哪怕其實需要先停一下。",
          "我有時候太怕讓人失望，以致說不出真正的界線。",
        ],
      },
    },
    {
      chakraId: "throat",
      chakraName: CHAKRA_META.throat.name,
      groups: {
        balanced: [
          "我能清楚說出自己的需求與界線。",
          "我說話時通常接近自己心裡真正的意思。",
          "當有必要時，我能在不攻擊對方的情況下表達不同意見。",
          "我也能安靜傾聽，而不需要急著插入自己的聲音。",
          "我不需要用包裝、誇大或拐彎，才能讓自己被聽見。",
          "即使感到緊張，我仍能盡量把真實感受說清楚。",
        ],
        deficit: [
          "我常在事後才想到，其實有話當時應該說。",
          "我很怕一開口就帶來尷尬、衝突或被討厭。",
          "我常把真正想說的吞回去，改說比較安全的話。",
          "別人問我需要什麼時，我常答得很模糊。",
          "當我想表達真實感受時，容易卡住或說不清。",
        ],
        excess: [
          "我有時會說得太多，事後才發現自己其實沒那麼想講。",
          "一感到不安或被忽視，我就會急著解釋、辯白或證明。",
          "我容易搶先表達，卻沒有真正聽完對方。",
          "我有時會用漂亮說法包住真正感受，讓人難以碰到我的真實。",
          "當場面沉默下來時，我會不自覺想用話語填滿它。",
        ],
      },
    },
    {
      chakraId: "thirdEye",
      chakraName: CHAKRA_META.thirdEye.name,
      groups: {
        balanced: [
          "我能看見自己反覆出現的心理模式。",
          "我做判斷時，通常能同時參考直覺與事實。",
          "我能分辨「我感覺到的」與「我推測出來的」不是同一件事。",
          "情緒起來時，我仍有能力退一步看清自己在發生什麼。",
          "我通常能察覺自己何時在投射，而不是把它當成絕對真相。",
          "面對複雜情況時，我多半能看見比較完整的脈絡。",
        ],
        deficit: [
          "我常重複同樣的模式，卻很難知道自己為什麼會這樣。",
          "我做決定時，常只看到眼前反應，抓不到更深層原因。",
          "當情緒很強時，我幾乎看不清自己。",
          "我平常很少停下來觀察自己的想法是怎麼形成的。",
          "別人指出我的盲點時，我常完全對不上。",
        ],
        excess: [
          "我容易過度解讀別人的話或反應。",
          "有些還沒被證實的感覺，我會很快把它當成事實。",
          "我常在腦中推演太多可能性，反而離真實越來越遠。",
          "我很容易把一時的直覺，延伸成完整結論。",
          "我有時太沉迷自己的解讀，以致聽不進其他可能。",
        ],
      },
    },
    {
      chakraId: "crown",
      chakraName: CHAKRA_META.crown.name,
      groups: {
        balanced: [
          "我通常能感到生命不只是眼前的得失。",
          "即使暫時沒有答案，我也能對未知保持基本開放。",
          "在困難中，我仍能維持某種更深層的信任感。",
          "我能思考意義與方向，同時不脫離現實生活。",
          "我不需要控制每一件事，才能感到內在安穩。",
          "我能接受有些事需要時間展開，而不是立刻看懂全部。",
        ],
        deficit: [
          "我常覺得生活只是在應付事情，很難感到更深的意義。",
          "當事情超出掌握時，我容易陷入強烈的不信任感。",
          "我很難對比自己更大的整體保持開放。",
          "遇到無法解釋的階段時，我常只覺得空掉或斷掉。",
          "我很少感到自己與生命有更深一層的連結。",
        ],
        excess: [
          "我會用靈性、命運或更高安排來跳過眼前該處理的事。",
          "我有時過度追逐神秘感受，反而忽略現實基礎。",
          "只要覺得某件事很有「指引感」，我就不太想再檢查細節。",
          "我容易把臣服理解成不用負責或不用選擇。",
          "我有時太想超越眼前困境，反而不願意真正待在當下。",
        ],
      },
    },
  ];

  const VALIDITY_QUESTIONS = [
    "過去 2–3 個月，我幾乎從未懷疑過自己任何一個決定。",
    "不管面對誰，我都能毫無猶豫地完全真實表達自己。",
    "即使非常疲累、受傷或受壓，我的內在狀態也幾乎不受影響。",
    "我幾乎不曾因情緒而做出後來想修正的反應。",
    "有時我會為了避免麻煩，而不完全說出真實感受。",
    "當事情失控時，我會比平常更想抓回主導權。",
    "我偶爾會連自己真正的需求都弄不清楚。",
    "在關係緊張時，我有時會先保護自己，而不是立刻保持開放。",
  ];

  const CONSISTENCY_RULES = [
    {
      validityId: 117,
      checks: [
        { questionId: 73, direction: "same" },
        { questionId: 75, direction: "same" },
        { questionId: 66, direction: "reverse" },
      ],
    },
    {
      validityId: 118,
      checks: [
        { questionId: 15, direction: "same" },
        { questionId: 44, direction: "same" },
        { questionId: 48, direction: "same" },
      ],
    },
    {
      validityId: 119,
      checks: [
        { questionId: 23, direction: "same" },
        { questionId: 27, direction: "same" },
        { questionId: 35, direction: "reverse" },
      ],
    },
    {
      validityId: 120,
      checks: [
        { questionId: 51, direction: "reverse" },
        { questionId: 57, direction: "same" },
        { questionId: 55, direction: "same" },
      ],
    },
  ];

  const questions = buildQuestionBank();
  const questionMap = new Map(questions.map((question) => [question.id, question]));

  const elements = {
    hero: document.getElementById("hero"),
    survey: document.getElementById("survey"),
    results: document.getElementById("results"),
    startButton: document.getElementById("start-button"),
    randomButton: document.getElementById("random-button"),
    resetButton: document.getElementById("reset-button"),
    restartButton: document.getElementById("restart-button"),
    exportButton: document.getElementById("export-button"),
    prevButton: document.getElementById("prev-button"),
    nextButton: document.getElementById("next-button"),
    pageTitle: document.getElementById("page-title"),
    progressCount: document.getElementById("progress-count"),
    progressPage: document.getElementById("progress-page"),
    progressFill: document.getElementById("progress-fill"),
    questionForm: document.getElementById("question-form"),
    questionTemplate: document.getElementById("question-template"),
    resultSummary: document.getElementById("result-summary"),
    resultHealingNote: document.getElementById("result-healing-note"),
    overallScore: document.getElementById("overall-score"),
    coherenceScore: document.getElementById("coherence-score"),
    confidenceScore: document.getElementById("confidence-score"),
    insightGrid: document.getElementById("insight-grid"),
    prioritySummary: document.getElementById("priority-summary"),
    priorityList: document.getElementById("priority-list"),
    qualityGrid: document.getElementById("quality-grid"),
    chakraGrid: document.getElementById("chakra-grid"),
    chakraCardTemplate: document.getElementById("chakra-card-template"),
  };

  let state = loadState();

  bindEvents();
  syncHeroState();

  function buildQuestionBank() {
    const bank = [];
    let id = 1;

    for (const section of CHAKRA_SECTIONS) {
      ["balanced", "deficit", "excess"].forEach((type) => {
        section.groups[type].forEach((text) => {
          bank.push({
            id,
            text,
            chakraId: section.chakraId,
            chakraName: section.chakraName,
            chakraEnglish: CHAKRA_META[section.chakraId].english,
            domain: TYPE_LABELS[type],
            type,
            isValidity: false,
          });
          id += 1;
        });
      });
    }

    VALIDITY_QUESTIONS.forEach((text, index) => {
      bank.push({
        id,
        text,
        chakraId: "validity",
        chakraName: "效度控制",
        chakraEnglish: "Validity",
        domain: index < 4 ? "自我保護傾向" : "一致性檢核",
        type: "validity",
        isValidity: true,
      });
      id += 1;
    });

    return bank;
  }

  function createInitialState() {
    return {
      sessionId:
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : `session-${Date.now()}`,
      startedAt: Date.now(),
      completedAt: null,
      pageIndex: 0,
      order: generateQuestionOrder(questions),
      answers: {},
    };
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return createInitialState();
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed.order) || parsed.order.length !== questions.length) {
        return createInitialState();
      }
      return {
        sessionId: parsed.sessionId || `session-${Date.now()}`,
        startedAt: parsed.startedAt || Date.now(),
        completedAt: parsed.completedAt || null,
        pageIndex: Number.isInteger(parsed.pageIndex) ? parsed.pageIndex : 0,
        order: parsed.order,
        answers: parsed.answers && typeof parsed.answers === "object" ? parsed.answers : {},
      };
    } catch (error) {
      return createInitialState();
    }
  }

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function clearState() {
    localStorage.removeItem(STORAGE_KEY);
    state = createInitialState();
    saveState();
    syncHeroState();
  }

  function bindEvents() {
    elements.startButton.addEventListener("click", handleStart);
    elements.randomButton.addEventListener("click", handleRandomFill);
    elements.resetButton.addEventListener("click", handleResetRequest);
    elements.restartButton.addEventListener("click", handleRestartRequest);
    elements.exportButton.addEventListener("click", exportResults);
    elements.prevButton.addEventListener("click", goPrevPage);
    elements.nextButton.addEventListener("click", goNextPage);
    elements.questionForm.addEventListener("change", handleAnswerChange);
  }

  function handleStart() {
    if (state.completedAt && isFullyAnswered()) {
      renderResults();
      return;
    }

    renderSurvey();
  }

  function handleResetRequest() {
    const confirmed = window.confirm("要清除本機紀錄並重新開始嗎？");
    if (!confirmed) return;
    clearState();
    showSection("hero");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleRestartRequest() {
    const confirmed = window.confirm("要開始一份新的測驗紀錄嗎？");
    if (!confirmed) return;
    clearState();
    renderSurvey();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function syncHeroState() {
    const answeredCount = Object.keys(state.answers).length;
    if (state.completedAt && isFullyAnswered()) {
      elements.startButton.textContent = "查看上次結果";
      return;
    }

    if (answeredCount > 0) {
      elements.startButton.textContent = `繼續作答 (${answeredCount}/120)`;
      return;
    }

    elements.startButton.textContent = "開始測驗";
  }

  function showSection(section) {
    elements.hero.classList.toggle("hidden", section !== "hero");
    elements.survey.classList.toggle("hidden", section !== "survey");
    elements.results.classList.toggle("hidden", section !== "results");
  }

  function renderSurvey() {
    syncHeroState();
    showSection("survey");

    const totalPages = Math.ceil(questions.length / PAGE_SIZE);
    const currentPage = clamp(state.pageIndex, 0, totalPages - 1);
    state.pageIndex = currentPage;
    saveState();

    const orderedQuestions = getOrderedQuestions();
    const startIndex = currentPage * PAGE_SIZE;
    const pageQuestions = orderedQuestions.slice(startIndex, startIndex + PAGE_SIZE);
    const answeredCount = Object.keys(state.answers).length;

    elements.pageTitle.textContent = `第 ${currentPage + 1} 頁題目`;
    elements.progressCount.textContent = `${answeredCount} / ${questions.length}`;
    elements.progressPage.textContent = `第 ${currentPage + 1} / ${totalPages} 頁`;
    elements.progressFill.style.width = `${(answeredCount / questions.length) * 100}%`;
    elements.prevButton.disabled = currentPage === 0;
    elements.nextButton.textContent = currentPage === totalPages - 1 ? "查看結果" : "下一頁";

    const fragment = document.createDocumentFragment();
    pageQuestions.forEach((question, localIndex) => {
      const node = elements.questionTemplate.content.firstElementChild.cloneNode(true);
      const questionNumber = startIndex + localIndex + 1;

      node.querySelector(".question-index").textContent = `題目 ${questionNumber}`;
      node.querySelector(
        ".question-chakra"
      ).textContent = `${question.chakraName} · ${question.domain}`;
      node.querySelector(".question-text").textContent = question.text;

      const optionContainer = node.querySelector(".likert-options");
      optionContainer.setAttribute("aria-label", question.text);

      for (let value = 1; value <= 7; value += 1) {
        const option = document.createElement("div");
        option.className = "likert-option";

        const input = document.createElement("input");
        input.type = "radio";
        input.name = `question-${question.id}`;
        input.id = `question-${question.id}-value-${value}`;
        input.value = String(value);
        input.dataset.questionId = String(question.id);
        input.checked = Number(state.answers[question.id]) === value;

        const label = document.createElement("label");
        label.setAttribute("for", input.id);
        label.textContent = String(value);

        option.appendChild(input);
        option.appendChild(label);
        optionContainer.appendChild(option);
      }

      fragment.appendChild(node);
    });

    elements.questionForm.replaceChildren(fragment);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleAnswerChange(event) {
    const target = event.target;
    if (!(target instanceof HTMLInputElement) || target.type !== "radio") return;

    const questionId = Number(target.dataset.questionId);
    const value = Number(target.value);
    if (!questionId || !value) return;

    state.answers[questionId] = value;
    saveState();
    syncHeroState();

    const answeredCount = Object.keys(state.answers).length;
    elements.progressCount.textContent = `${answeredCount} / ${questions.length}`;
    elements.progressFill.style.width = `${(answeredCount / questions.length) * 100}%`;
  }

  function goPrevPage() {
    state.pageIndex = clamp(state.pageIndex - 1, 0, Math.ceil(questions.length / PAGE_SIZE) - 1);
    saveState();
    renderSurvey();
  }

  function handleRandomFill() {
    const hasExistingProgress = Object.keys(state.answers).length > 0;
    if (hasExistingProgress) {
      const confirmed = window.confirm("隨機作答會覆蓋目前紀錄。要繼續嗎？");
      if (!confirmed) return;
    }

    state = createInitialState();
    state.startedAt = Date.now();
    state.answers = Object.fromEntries(
      questions.map((question) => [question.id, 1 + Math.floor(Math.random() * 7)])
    );
    state.completedAt = Date.now();
    saveState();
    renderResults();
  }

  function goNextPage() {
    const orderedQuestions = getOrderedQuestions();
    const startIndex = state.pageIndex * PAGE_SIZE;
    const pageQuestions = orderedQuestions.slice(startIndex, startIndex + PAGE_SIZE);
    const unanswered = pageQuestions.filter((question) => !state.answers[question.id]);

    if (unanswered.length > 0) {
      window.alert("這一頁還有未作答題目。請先完成本頁所有題目。");
      return;
    }

    const totalPages = Math.ceil(questions.length / PAGE_SIZE);

    if (state.pageIndex === totalPages - 1) {
      state.completedAt = Date.now();
      saveState();
      renderResults();
      return;
    }

    state.pageIndex += 1;
    saveState();
    renderSurvey();
  }

  function renderResults() {
    if (!isFullyAnswered()) {
      renderSurvey();
      return;
    }

    if (!state.completedAt) {
      state.completedAt = Date.now();
      saveState();
    }

    const report = computeReport();
    showSection("results");

    elements.overallScore.textContent = `${report.overall}%`;
    elements.coherenceScore.textContent = `${report.coherence}%`;
    elements.confidenceScore.textContent = `${Math.round(report.confidence * 100)}%`;
    elements.resultSummary.textContent = buildOverallSummary(report);
    elements.resultHealingNote.textContent = buildOverallHealingNote(report);

    renderInsights(report);
    renderPriorities(report);
    renderQuality(report.quality);
    renderChakraCards(report.chakras);
    syncHeroState();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function renderInsights(report) {
    const fragment = document.createDocumentFragment();

    report.insights.forEach((entry) => {
      const card = document.createElement("article");
      card.className = "insight-card";

      const value = document.createElement("strong");
      value.textContent = entry.value;

      const title = document.createElement("h4");
      title.textContent = entry.title;

      const copy = document.createElement("p");
      copy.className = "insight-copy";
      copy.textContent = entry.copy;

      card.appendChild(value);
      card.appendChild(title);
      card.appendChild(copy);
      fragment.appendChild(card);
    });

    elements.insightGrid.replaceChildren(fragment);
  }

  function renderPriorities(report) {
    elements.prioritySummary.textContent = report.prioritySummary;

    const fragment = document.createDocumentFragment();

    report.priorities.forEach((entry, index) => {
      const item = document.createElement("article");
      item.className = "priority-item";

      const head = document.createElement("div");
      head.className = "priority-head";

      const rank = document.createElement("span");
      rank.className = "priority-rank";
      rank.textContent = `優先 ${index + 1}`;

      const titleWrap = document.createElement("div");

      const title = document.createElement("h4");
      title.textContent = entry.title;

      const meta = document.createElement("p");
      meta.className = "priority-meta";
      meta.textContent = `主分數 ${entry.finalPct}% · 閉塞 ${entry.blockedPct}% · 過度 ${entry.excessPct}%`;

      titleWrap.appendChild(title);
      titleWrap.appendChild(meta);
      head.appendChild(rank);
      head.appendChild(titleWrap);

      const copy = document.createElement("p");
      copy.className = "priority-copy";
      copy.textContent = entry.copy;

      item.appendChild(head);
      item.appendChild(copy);
      fragment.appendChild(item);
    });

    elements.priorityList.replaceChildren(fragment);
  }

  function renderQuality(quality) {
    const entries = [
      {
        label: "作答時間（參考）",
        value: `${quality.durationMinutes} 分鐘`,
        copy: quality.durationNote,
      },
      {
        label: "自我保護濾鏡",
        value: `${quality.socialDesirabilityPct}%`,
        copy: quality.socialDesirabilityNote,
      },
      {
        label: "狀態一致感",
        value: `${quality.inconsistencyPct}%`,
        copy: quality.inconsistencyNote,
      },
      {
        label: "作答節奏平坦度",
        value: `${quality.longestRun} 題連續同值`,
        copy: quality.straightLineNote,
      },
      {
        label: "感受層次",
        value: quality.responseStdDev.toFixed(2),
        copy: quality.varianceNote,
      },
      {
        label: "閱讀建議",
        value: quality.confidenceLabel,
        copy: quality.confidenceNote,
      },
    ];

    const fragment = document.createDocumentFragment();
    entries.forEach((entry) => {
      const chip = document.createElement("article");
      chip.className = "quality-chip";

      const label = document.createElement("span");
      label.className = "metric-label";
      label.textContent = entry.label;

      const value = document.createElement("strong");
      value.textContent = entry.value;

      const copy = document.createElement("p");
      copy.textContent = entry.copy;

      chip.appendChild(label);
      chip.appendChild(value);
      chip.appendChild(copy);
      fragment.appendChild(chip);
    });

    elements.qualityGrid.replaceChildren(fragment);
  }

  function renderChakraCards(chakraReports) {
    const fragment = document.createDocumentFragment();

    chakraReports.forEach((report) => {
      const node = elements.chakraCardTemplate.content.firstElementChild.cloneNode(true);

      node.querySelector(".chakra-name").textContent = `${report.name} · ${report.english}`;
      node.querySelector(".chakra-score").textContent = `${report.finalPct}%`;
      node.querySelector(".chakra-pattern").textContent = report.patternLabel;
      node.querySelector(".chakra-summary").textContent = report.summary;
      node.querySelector(".chakra-main").textContent = `${report.finalPct}%`;
      node.querySelector(".chakra-blocked").textContent = `${report.blockedPct}%`;
      node.querySelector(".chakra-excess").textContent = `${report.excessPct}%`;
      node.querySelector(".bar-main").style.width = `${report.finalPct}%`;
      node.querySelector(".bar-blocked").style.width = `${report.blockedPct}%`;
      node.querySelector(".bar-excess").style.width = `${report.excessPct}%`;

      const detailFragment = document.createDocumentFragment();
      report.details.forEach((entry) => {
        const detail = document.createElement("article");
        detail.className = "chakra-detail";

        const title = document.createElement("h4");
        title.textContent = entry.label;

        const copy = document.createElement("p");
        copy.className = "chakra-detail-copy";
        copy.textContent = entry.copy;

        detail.appendChild(title);
        detail.appendChild(copy);
        detailFragment.appendChild(detail);
      });

      node.querySelector(".chakra-details").replaceChildren(detailFragment);

      fragment.appendChild(node);
    });

    elements.chakraGrid.replaceChildren(fragment);
  }

  function computeReport() {
    const answerOrder = state.order.map((id) => questionMap.get(id));
    const rawAnswers = answerOrder.map((question) => Number(state.answers[question.id]));
    const quality = computeQuality(rawAnswers);
    const chakras = CHAKRA_SECTIONS.map((section) => computeChakraScore(section));
    const finalScores = chakras.map((chakra) => chakra.finalPct);
    const flowBlocks = chakras.slice(0, -1).map((chakra, index) => {
      const next = chakras[index + 1];
      return {
        fromId: chakra.id,
        from: chakra.name,
        fromFocus: chakra.focus,
        toId: next.id,
        to: next.name,
        toFocus: next.focus,
        gap: Math.abs(chakra.finalPct - next.finalPct),
      };
    });
    const avgResistance = mean(flowBlocks.map((block) => block.gap));
    const largestFlowBlock = flowBlocks.reduce(
      (largest, block) => (block.gap > largest.gap ? block : largest),
      flowBlocks[0] || { from: "", to: "", gap: 0 }
    );
    const overall = round(mean(finalScores));
    const coherence = clamp(round(100 - avgResistance), 0, 100);
    const avgPressure = round(mean(chakras.map((chakra) => chakra.pressurePct)));
    const strongestChakras = chakras
      .slice()
      .sort((left, right) => right.finalPct - left.finalPct)
      .slice(0, 2);
    const weakestChakras = chakras
      .slice()
      .sort((left, right) => left.finalPct - right.finalPct)
      .slice(0, 2);
    const mostPressuredChakra = chakras
      .slice()
      .sort((left, right) => right.pressurePct - left.pressurePct || left.finalPct - right.finalPct)[0];
    const mostStableChakra = chakras
      .slice()
      .sort((left, right) => right.finalPct - left.finalPct || left.pressurePct - right.pressurePct)[0];
    const mostBlockedChakra = chakras
      .slice()
      .sort((left, right) => right.blockedPct - left.blockedPct || left.finalPct - right.finalPct)[0];
    const mostExcessChakra = chakras
      .slice()
      .sort((left, right) => right.excessPct - left.excessPct || left.finalPct - right.finalPct)[0];
    const strainedResources = chakras
      .filter((chakra) => chakra.finalPct >= 60 && chakra.pressurePct >= 45)
      .sort((left, right) => right.pressurePct - left.pressurePct || right.finalPct - left.finalPct);
    const calmResources = chakras
      .filter((chakra) => chakra.finalPct >= 68 && chakra.pressurePct < 38)
      .sort((left, right) => right.finalPct - left.finalPct || left.pressurePct - right.pressurePct);
    const patternCounts = buildPatternCounts(chakras);
    const lowerAverage = round(
      mean(chakras.filter((chakra) => ["root", "sacral", "solar"].includes(chakra.id)).map((chakra) => chakra.finalPct))
    );
    const upperAverage = round(
      mean(
        chakras
          .filter((chakra) => ["throat", "thirdEye", "crown"].includes(chakra.id))
          .map((chakra) => chakra.finalPct)
      )
    );
    const systemTendency = determineSystemTendency(chakras, patternCounts);
    const integrationProfile = determineIntegrationProfile(chakras, lowerAverage, upperAverage);
    const priorities = buildPriorityList(chakras);

    const report = {
      overall,
      coherence,
      avgResistance,
      avgPressure,
      flowBlocks,
      largestFlowBlock,
      confidence: quality.confidence,
      quality,
      chakras,
      strongestChakras,
      weakestChakras,
      mostPressuredChakra,
      mostStableChakra,
      mostBlockedChakra,
      mostExcessChakra,
      strainedResources,
      calmResources,
      lowerAverage,
      upperAverage,
      patternCounts,
      systemTendency,
      integrationProfile,
      priorities,
      exportedAt: new Date().toISOString(),
    };

    report.insights = buildSystemInsights(report);
    report.prioritySummary = buildPrioritySummary(report);
    return report;
  }

  function computeChakraScore(section) {
    const chakraQuestions = questions.filter((question) => question.chakraId === section.chakraId);
    const balanced = chakraQuestions.filter((question) => question.type === "balanced");
    const deficit = chakraQuestions.filter((question) => question.type === "deficit");
    const excess = chakraQuestions.filter((question) => question.type === "excess");

    const balancedMean = mean(balanced.map((question) => normalize(state.answers[question.id])));
    const deficitMean = mean(deficit.map((question) => normalize(state.answers[question.id])));
    const excessMean = mean(excess.map((question) => normalize(state.answers[question.id])));
    const deficitHealth = 1 - deficitMean;
    const excessHealth = 1 - excessMean;
    const core =
      3 /
      (1 / Math.max(balancedMean, 0.01) +
        1 / Math.max(deficitHealth, 0.01) +
        1 / Math.max(excessHealth, 0.01));
    const penalty = 1 - 0.1 * Math.abs(deficitMean - excessMean);
    const rawPct = round(100 * clamp(core * penalty, 0, 1));
    const finalPct = rawPct;
    const blockedPct = round(deficitMean * 100);
    const excessPct = round(excessMean * 100);
    const pattern = determinePattern(blockedPct, excessPct, finalPct);
    const chakraReport = {
      id: section.chakraId,
      name: section.chakraName,
      english: CHAKRA_META[section.chakraId].english,
      focus: CHAKRA_META[section.chakraId].focus,
      balancedPct: round(balancedMean * 100),
      rawPct,
      finalPct,
      blockedPct,
      excessPct,
      pressurePct: round((blockedPct + excessPct) / 2),
      imbalanceGap: Math.abs(blockedPct - excessPct),
      deficitHealthPct: round(deficitHealth * 100),
      excessHealthPct: round(excessHealth * 100),
      patternKey: pattern.key,
      patternLabel: pattern.label,
      dominantSide: pattern.side,
      priorityScore: computePriorityScore(finalPct, blockedPct, excessPct, pattern.key),
    };

    chakraReport.summary = buildChakraSummary(chakraReport);
    chakraReport.details = buildChakraDetails(chakraReport);
    return chakraReport;
  }

  function computeQuality(rawAnswers) {
    const socialDesirabilityRaw = mean([113, 114, 115, 116].map((id) => Number(state.answers[id])));
    const socialDesirability = mean([113, 114, 115, 116].map((id) => normalize(state.answers[id])));
    const highIdealizationCount = [113, 114, 115, 116].filter(
      (id) => Number(state.answers[id]) >= 6
    ).length;
    const socialDesirabilityFlag = socialDesirabilityRaw > 5.8 || highIdealizationCount >= 2;

    const consistencyDiffs = CONSISTENCY_RULES.map((rule) => {
      const validityValue = normalize(state.answers[rule.validityId]);
      const expectedCoreValue = mean(
        rule.checks.map((check) => {
          const coreValue = normalize(state.answers[check.questionId]);
          return check.direction === "reverse" ? 1 - coreValue : coreValue;
        })
      );
      return Math.abs(validityValue - expectedCoreValue);
    });
    const inconsistency = mean(consistencyDiffs);
    const mismatchCount = consistencyDiffs.filter((diff) => diff >= 0.34).length;

    const durationMinutes = Math.max(
      1,
      round(((state.completedAt || Date.now()) - state.startedAt) / 60000)
    );
    const longestRun = computeLongestRun(rawAnswers);
    const responseStdDev = stddev(rawAnswers);
    const straightPenalty = longestRun >= 18 || responseStdDev < 0.55 ? 0.15 : 0;
    const idealizationPenalty = socialDesirabilityFlag ? 0.08 : 0;
    const mismatchPenalty = mismatchCount >= 2 ? 0.1 : mismatchCount === 1 ? 0.05 : 0;
    const confidence = clamp(
      1 -
        0.3 * socialDesirability -
        0.4 * inconsistency -
        straightPenalty -
        idealizationPenalty -
        mismatchPenalty,
      0.55,
      1
    );

    return {
      durationMinutes,
      durationNote: "作答節奏只作參考，快一點或慢一點都沒有對錯，重點仍是你當下有沒有把自己放進來。",
      socialDesirabilityPct: round(socialDesirability * 100),
      socialDesirabilityNote:
        socialDesirabilityFlag
          ? highIdealizationCount >= 3 || socialDesirabilityRaw >= 6.2
            ? `這幾題看見你有一部分可能很想把自己放在「我其實還撐得住」的位置上，這是常見的自我保護。結果可能會比真實狀態再明亮一些。`
            : `這裡出現一點想把自己回答得更理想的傾向，很多人在疲累、想維持形象或不想麻煩別人時都會這樣。`
          : "這一組答案大致能看見你願意把真實狀態放進來，結果的參考性也因此比較穩。"
      ,
      inconsistencyPct: round(inconsistency * 100),
      inconsistencyNote:
        mismatchCount >= 2
          ? `前後有 ${mismatchCount} 組答案落差較大，這不一定是亂答，也可能表示你在不同情境下真的很不一樣。閱讀結果時，建議把它當成一張當下切片，而不是絕對定論。`
          : mismatchCount === 1
            ? "有一組答案前後不太一致，可能代表你在某些議題上本來就會搖擺，這很正常，只是解讀上要多留一點彈性。"
            : "前後答案整體方向一致，表示這份結果和你當下的主觀感受大致對得上。"
      ,
      longestRun,
      straightLineNote:
        longestRun >= 24
          ? "有一段相同選項連得比較長，像是當時有點累、想快一點完成，或有些感受還來不及細分。這會讓細節辨識度下降一些。"
          : longestRun >= 18
            ? "有一小段答案比較平，可能是你在某一段題目裡進入了自動作答。這不會讓結果失效，但細節閱讀要溫柔一點。"
            : "沒有看到明顯的趕答痕跡，整體節奏算是自然。"
      ,
      responseStdDev,
      varianceNote:
        responseStdDev < 0.55
          ? "答案分布比較集中。這有時代表你最近真的有點麻、很平，也有可能是作答時想先快速完成；因此細微差異可能被壓平一些。"
          : responseStdDev < 0.85
            ? "答案起伏適中，表示你大致有分出不同題目的感受層次。"
            : "答案層次分得很開，表示你對自己近期狀態的差異有相當清楚的感受。"
      ,
      confidence,
      confidenceLabel:
        confidence >= 0.85 ? "穩定參考" : confidence >= 0.7 ? "彈性參考" : "先留白",
      confidenceNote:
        confidence >= 0.85
          ? "這份結果可以安心作為主要參考，因為它大致貼近你此刻真正的狀態。"
          : confidence >= 0.7
            ? "這份結果仍然很有價值，可以把它當成一張溫柔地圖，只是在個別細節上保留一些彈性會更好。"
            : "這份結果先當成當下切片就好，不用急著把它當成定論。若你願意，之後在比較安穩的狀態下再做一次，畫面通常會更清楚。"
      ,
      straightPenalty,
      idealizationPenalty,
      mismatchPenalty,
      socialDesirabilityRaw,
      highIdealizationCount,
      socialDesirabilityFlag,
      mismatchCount,
      consistencyDiffs,
    };
  }

  function joinChakraNames(chakras) {
    return chakras
      .filter(Boolean)
      .map((chakra) => chakra.name || chakra.title)
      .join("、");
  }

  function buildPatternCounts(chakras) {
    return chakras.reduce(
      (result, chakra) => {
        result[chakra.patternKey] += 1;
        if (chakra.pressurePct >= 50) result.highPressure += 1;
        if (chakra.finalPct < 50) result.lowEnergy += 1;
        if (chakra.finalPct >= 60 && chakra.pressurePct >= 45) result.strained += 1;
        if (chakra.finalPct >= 68 && chakra.pressurePct < 38) result.stable += 1;
        return result;
      },
      {
        balanced: 0,
        blocked: 0,
        excess: 0,
        mixed: 0,
        highPressure: 0,
        lowEnergy: 0,
        strained: 0,
        stable: 0,
      }
    );
  }

  function buildSystemPressureCopy(report) {
    if (report.avgPressure >= 58) {
      return `七輪平均壓力來到 ${report.avgPressure}%，表示現在不是只有單點疲累，而是整套系統都帶著明顯防守。${report.mostPressuredChakra.name} 的張力最高，通常也會是你最先感到卡、煩、累或想關掉的地方。`;
    }

    if (report.avgPressure >= 48) {
      return `七輪平均壓力為 ${report.avgPressure}%，代表系統還在運作，但不少輪位其實都在邊撐邊跑。${report.mostPressuredChakra.name} 是目前最容易被拉緊的焦點。`;
    }

    if (report.avgPressure >= 38) {
      return `七輪平均壓力為 ${report.avgPressure}%，整體張力不算最低，但還保留一定回穩空間。只要有休息、界線與支持，修復通常還跟得上。`;
    }

    return `七輪平均壓力為 ${report.avgPressure}%，表示多數輪位雖然仍有起伏，但防守感沒有全面壓過系統，穩定維持會比大幅翻修更有效。`;
  }

  function buildFlowSummary(report) {
    if (report.largestFlowBlock.gap >= 18) {
      return `目前最大的流動斷點落在 ${report.largestFlowBlock.from} 與 ${report.largestFlowBlock.to} 之間，落差有 ${report.largestFlowBlock.gap} 分。這通常表示你不是整體都差，而是走到這個轉換時特別容易中途掉速。`;
    }

    if (report.largestFlowBlock.gap >= 12) {
      return `目前最容易漏氣的轉換落在 ${report.largestFlowBlock.from} 與 ${report.largestFlowBlock.to} 之間，表示你從一種內在功能走向下一段時，會比較辛苦。`;
    }

    if (report.coherence >= 78) {
      return "七輪之間的步調差距不大，代表系統內部還保有不錯的接續感。現在比較重要的是穩穩維持，而不是急著找出哪裡壞掉。";
    }

    return "七輪之間雖然仍有高低差，但沒有特別劇烈的斷裂，代表系統還保留著一定的回穩能力。";
  }

  function buildStrongResourceCopy(report) {
    const strongest = joinChakraNames(report.strongestChakras);

    if (report.strainedResources.length) {
      const strained = joinChakraNames(report.strainedResources.slice(0, 2));
      return `現在最能支撐你的資源在 ${strongest}。不過 ${strained} 也同時帶著不小張力，表示這些強項有一部分是靠撐出來的，不完全是輕鬆的穩定。`;
    }

    return `現在最能支撐你的資源在 ${strongest}，而且目前不算特別吃力，表示它們是真正可以拿來當修復支點的地方。`;
  }

  function buildRepairFocusCopy(report) {
    const first = report.priorities[0];

    if (!first) {
      return "現階段不需要平均修整全部輪位，先抓住最有感的一個區段慢慢照顧，通常就會比全面出力更有效。";
    }

    if (report.largestFlowBlock.gap >= 12) {
      return `如果你現在只能先照顧一個地方，建議從 ${first.title} 開始，並一起留意 ${report.largestFlowBlock.from} 到 ${report.largestFlowBlock.to} 這段的轉換，因為現在耗能不只在單一輪位，也在輪位之間的接續。`;
    }

    return `如果你現在只能先照顧一個地方，建議從 ${first.title} 開始。這個順序不是只看誰分數最低，而是一起看主分數、壓力值與它對整體節奏的牽動程度。`;
  }

  function buildOverallSummary(report) {
    const weak = joinChakraNames(report.weakestChakras);
    const balanceLine = describeOverallBalance(report);
    const resourceLine = buildStrongResourceCopy(report);
    const pressureLine = buildSystemPressureCopy(report);
    const flowLine = buildFlowSummary(report);

    return `${balanceLine} ${resourceLine} 最想被溫柔照顧的是 ${weak}。${pressureLine} ${flowLine} 你的系統目前較常透過「${report.systemTendency.label}」來保護自己，而這份結果的作答信心為 ${Math.round(
      report.confidence * 100
    )}%，${report.quality.confidenceNote}`;
  }

  function buildOverallHealingNote(report) {
    const pace = buildHealingPace(report);
    const readingMode = buildReadingMode(report);
    const focusLine = buildRepairFocusCopy(report);
    const strainLine =
      report.strainedResources.length > 0
        ? `另外也別漏看 ${joinChakraNames(report.strainedResources.slice(0, 2))} 這些「看起來還能運作」的地方，它們不一定最低分，但很可能已經默默過勞。`
        : "現階段比較重要的是維持可持續的節奏，讓已經相對穩的輪位繼續當支點，而不是每一輪都平均出力。";
    const compassionLine =
      report.overall >= 70
        ? "這份結果不是在提醒你哪裡不夠好，而是在讓你看見，原來你已經有一些地方很會照顧自己，還有一些地方最近比較累。"
        : report.overall >= 50
          ? "這份結果不是要你立刻修好自己，而是想輕輕告訴你，有些地方其實已經撐了很久，現在值得被慢慢接住。"
          : "如果你看到某些分數偏低，先不用急著自責。低分很多時候不是失敗，而是那些地方真的已經太久沒被好好安放。";

    return `${compassionLine} ${pace.copy} ${focusLine} ${strainLine} ${readingMode.copy}`;
  }

  function buildChakraSummary(chakra) {
    const pressureLine =
      chakra.pressurePct >= 55
        ? "目前內在張力偏高，很多運作可能都帶著防守感"
        : chakra.pressurePct >= 40
          ? "目前已有明顯張力，表示這裡不是沒功能，而是有一部分在邊撐邊維持"
          : "目前防守與補償不算太重，代表這裡還有一些自然回穩空間";
    const roleLine =
      chakra.finalPct >= 72
        ? "它仍是系統裡相對有功能的輪位之一"
        : chakra.finalPct >= 55
          ? "它目前仍有可用功能，但敏感度明顯比平常高"
          : "它目前已經是整體裡比較值得優先照顧的區段";

    return `${describeChakraState(chakra)} 核心主題是 ${chakra.focus}。${describePatternSummary(
      chakra
    )} ${pressureLine}，${roleLine}。目前平衡題 ${chakra.balancedPct}%，閉塞 ${chakra.blockedPct}%，過度活躍 ${chakra.excessPct}%。`;
  }

  function buildChakraDetails(chakra) {
    const meta = CHAKRA_META[chakra.id];

    return [
      {
        label: "這裡還留下的光",
        copy: buildChakraResourceCopy(chakra, meta),
      },
      {
        label: "你可能怎麼在保護自己",
        copy: buildChakraImbalanceCopy(chakra, meta),
      },
      {
        label: "最容易被觸發的情境",
        copy: buildChakraTriggerCopy(chakra, meta),
      },
      {
        label: "在日常裡可能怎麼表現",
        copy: buildChakraDailyLifeCopy(chakra, meta),
      },
      {
        label: "身心可能的感受",
        copy: buildChakraFeelingCopy(chakra, meta),
      },
      {
        label: "可以先這樣陪自己",
        copy: buildChakraGuidanceCopy(chakra, meta),
      },
      {
        label: "先不要太快這樣做",
        copy: buildChakraCautionCopy(chakra, meta),
      },
      {
        label: "送給你的提醒",
        copy: buildChakraAffirmationCopy(chakra, meta),
      },
    ];
  }

  function determinePattern(blockedPct, excessPct, finalPct) {
    const gap = blockedPct - excessPct;

    if (finalPct >= 75 && blockedPct < 35 && excessPct < 35) {
      return { key: "balanced", label: "溫和流動", side: "balanced" };
    }

    if (blockedPct >= 45 && excessPct >= 45) {
      return { key: "mixed", label: "需要抱住", side: "mixed" };
    }

    if (gap >= 10) {
      return { key: "blocked", label: "先收著", side: "blocked" };
    }

    if (gap <= -10) {
      return { key: "excess", label: "先撐著", side: "excess" };
    }

    return { key: "mixed", label: "需要抱住", side: "mixed" };
  }

  function buildSystemInsights(report) {
    const strongest = joinChakraNames(report.strongestChakras);
    const strongestFocus = report.strongestChakras.map((chakra) => chakra.focus).join("、");
    const weakest = report.weakestChakras[0];
    const repairStart = report.priorities[0];
    const pace = buildHealingPace(report);
    const readingMode = buildReadingMode(report);
    const hiddenCost = report.strainedResources[0];
    const stableBase = report.calmResources[0] || report.mostStableChakra;
    const flowCopy =
      report.largestFlowBlock.gap >= 12
        ? `這段落差有 ${report.largestFlowBlock.gap} 分，像是從 ${report.largestFlowBlock.fromFocus} 走到 ${report.largestFlowBlock.toFocus} 的路上，比較容易中途漏氣。`
        : "目前七輪之間沒有非常突出的斷點，療癒重點更偏向穩穩維持，而不是大幅度修補。";
    const hiddenCostCopy =
      hiddenCost
        ? `${hiddenCost.name} 主分數仍有 ${hiddenCost.finalPct}%，但內在張力來到 ${hiddenCost.pressurePct}%。這表示它雖然還能運作，卻不是毫不費力，很可能已經替你扛了不少。`
        : `${stableBase.name} 目前既有功能也相對穩，表示你手上還有真正可用、不是靠硬撐出來的資源。`;

    return [
      {
        value: pace.label,
        title: "此刻的內在天氣",
        copy: describeOverallBalance(report),
      },
      {
        value: `${report.avgPressure}%`,
        title: "系統整體張力",
        copy: buildSystemPressureCopy(report),
      },
      {
        value: strongest,
        title: "仍在支撐你的光",
        copy: `這兩輪是你現在最容易調動的支點，表示在 ${strongestFocus} 相關議題上，系統仍保有可用資源。`,
      },
      {
        value: hiddenCost ? hiddenCost.name : stableBase.name,
        title: hiddenCost ? "看起來能撐但其實很累" : "相對安穩的支點",
        copy: hiddenCostCopy,
      },
      {
        value: weakest.name,
        title: "最想被抱住的地方",
        copy: `${weakest.name} 是目前最脆弱的位置。這不表示你不好，而是這裡最近真的比較辛苦，也比較需要被慢慢照顧。`,
      },
      {
        value: report.mostPressuredChakra.name,
        title: "壓力最集中的位置",
        copy: `${report.mostPressuredChakra.name} 的內在張力最高（${report.mostPressuredChakra.pressurePct}%）。當你覺得整體快撐不住時，很多時候就是先從這裡感到卡、累、躁或想抽離。`,
      },
      {
        value: report.systemTendency.label,
        title: "你常用的保護方式",
        copy: report.systemTendency.copy,
      },
      {
        value:
          report.largestFlowBlock.gap >= 12
            ? `${report.largestFlowBlock.from} → ${report.largestFlowBlock.to}`
            : "沒有明顯斷層",
        title: "最容易漏氣的轉換",
        copy: flowCopy,
      },
      {
        value: repairStart.title,
        title: "最值得先被接住",
        copy: buildRepairFocusCopy(report),
      },
      {
        value: report.integrationProfile.label,
        title: "身體與高層感受的對話",
        copy: report.integrationProfile.copy,
      },
      {
        value: readingMode.label,
        title: "怎麼閱讀這份結果",
        copy: readingMode.copy,
      },
    ];
  }

  function buildPriorityList(chakras) {
    return chakras
      .slice()
      .sort((left, right) => right.priorityScore - left.priorityScore)
      .slice(0, 3)
      .map((chakra) => ({
        id: chakra.id,
        title: chakra.name,
        focus: chakra.focus,
        finalPct: chakra.finalPct,
        blockedPct: chakra.blockedPct,
        excessPct: chakra.excessPct,
        copy: buildPriorityCopy(chakra),
      }));
  }

  function buildPrioritySummary(report) {
    const priorityNames = joinChakraNames(report.priorities);
    const reasonLine =
      report.largestFlowBlock.gap >= 12
        ? "這個順序同時看主分數、內在張力與輪位之間的斷點，所以不是只看誰最低。"
        : "這個順序同時看主分數、內在張力與保護模式，比只看單一低分更能反映現在真正的耗能點。";
    const reliabilityNote =
      report.confidence >= 0.7
        ? "不用一次把全部修好，先把最累的地方接住，整體通常就會先鬆一口氣。"
        : "先把這個順序當成一張柔軟地圖就好，之後若重測，畫面可能還會再更清楚。";

    return `如果你現在只想先照顧一小部分自己，建議依序留意 ${priorityNames}。${reasonLine} ${reliabilityNote}`;
  }

  function buildPriorityCopy(chakra) {
    const meta = CHAKRA_META[chakra.id];
    const issueLine =
      chakra.patternKey === "blocked"
        ? `這裡比較像先把自己收起來，避免再受刺激或再多承受一些。`
        : chakra.patternKey === "excess"
          ? `這裡比較像先用力撐著，透過加速、解釋、控制或不斷出力來抵住不安。`
          : chakra.patternKey === "mixed"
            ? `這裡同時有想退後與想趕快撐住的兩股力，因此通常也是最耗神的位置。`
            : `這裡不一定特別劇烈，但最近已經比較敏感，累的時候很容易先掉下來。`;
    const pressureLine =
      chakra.pressurePct >= 55
        ? `目前這裡的內在張力有 ${chakra.pressurePct}%，已經不是小疲勞，而是很容易一被碰就整段緊起來。`
        : chakra.pressurePct >= 40
          ? `目前這裡的內在張力有 ${chakra.pressurePct}%，代表它雖然還在運作，但已經帶著明顯耗能。`
          : `這裡現在還有一點回穩空間，所以只要照顧方式對，通常比較容易慢慢鬆開。`;

    return `${chakra.name} 目前主分數 ${chakra.finalPct}%，表示它已經開始牽動整體節奏。${issueLine} ${pressureLine} 這不是你的錯，而是這個部分已經替你撐了太久。${meta.practice}。`;
  }

  function determineSystemTendency(chakras, patternCounts = buildPatternCounts(chakras)) {
    const counts = patternCounts;

    if (counts.blocked >= 3 && counts.blocked > counts.excess + 1) {
      return {
        label: "暫時內收保護",
        copy: "壓力來時，你的系統較常透過退後、安靜、切斷或縮小需求來保護自己。這不是冷漠，而比較像先把能量收回來。",
      };
    }

    if (counts.excess >= 3 && counts.excess > counts.blocked + 1) {
      return {
        label: "努力撐住型",
        copy: "壓力來時，你的系統較常透過用力推進、加速表現、解釋、控制或持續出力來維持穩定。很多時候，看起來很能撐，其實裡面已經很累。",
      };
    }

    if (counts.mixed >= 3 || (counts.blocked >= 2 && counts.excess >= 2)) {
      return {
        label: "一邊忍一邊撐",
        copy: "你目前不是單純偏弱或偏強，而是收縮與補償同時存在。內在常會一邊想退開，一邊又逼自己撐住，所以特別容易累。",
      };
    }

    return {
      label: "局部需要照顧",
      copy: "整體沒有單一保護模式壓過全局，表示你不是整個人都很亂，而是有幾個特定位置最近比較需要被看見和安放。",
    };
  }

  function determineIntegrationProfile(chakras, lowerAverage, upperAverage) {
    const heart = chakras.find((chakra) => chakra.id === "heart");
    const throat = chakras.find((chakra) => chakra.id === "throat");
    const solar = chakras.find((chakra) => chakra.id === "solar");
    const upperGap = upperAverage - lowerAverage;
    const heartBridgeGap = round(mean([solar.finalPct, throat.finalPct]) - heart.finalPct);

    let label = "上下層慢慢靠攏";
    let copy = "身體、情緒、表達與意義感之間的平均差距不算太大，重點不在誰太強誰太弱，而在彼此能不能好好接住。";

    if (upperGap >= 12) {
      label = "上層明顯先飛出去";
      copy =
        "洞察、表達與意義感明顯跑得比落地感、情緒承載與行動整合更快。你可能很懂、也想得很遠，但身體和現實節奏還沒有完全跟上。";
    } else if (upperGap >= 8) {
      label = "上層先飛出去";
      copy =
        "洞察、表達與意義感跑得比落地感、情緒承載與行動整合更快。你可能懂很多、也感覺很多，但身體和現實節奏還沒完全跟上。";
    } else if (upperGap <= -12) {
      label = "下層明顯先扛著";
      copy =
        "現實應對、情緒反應或執行推進明顯比表達、反思與更高視角的整合更快，像是先把日子撐住，再慢慢回頭理解自己。";
    } else if (upperGap <= -8) {
      label = "下層先扛著";
      copy =
        "現實應對、情緒反應或執行推進相對更強，像是先把日子撐過去；但表達、反思與更高視角的整合速度比較慢。";
    } else if (heartBridgeGap >= 10) {
      label = "中段比較缺橋";
      copy =
        "上下層平均差距不算大，但力量走到心的位置時會掉一截。這通常表示你不是完全沒有能力，而是在連結、接納與柔軟過渡上比較吃力。";
    } else if (heartBridgeGap <= -10) {
      label = "心是主要緩衝";
      copy =
        "上下層平均差距不算大，而且心輪相對較穩，表示關係感、接納與柔軟仍能成為系統裡很重要的修復橋樑。";
    }

    if (heartBridgeGap >= 8) {
      copy += " 心輪低於兩側，表示力量要走向連結與表達時，中間比較缺少柔軟的過渡。";
    } else if (heartBridgeGap <= -8) {
      copy += " 心輪高於兩側，表示關係感與接納能力仍能成為上下層之間很重要的緩衝。";
    }

    return {
      label,
      copy,
      lowerAverage,
      upperAverage,
      heartBridgeGap,
    };
  }

  function computePriorityScore(finalPct, blockedPct, excessPct, patternKey) {
    const base =
      (100 - finalPct) * 0.55 +
      Math.max(blockedPct, excessPct) * 0.25 +
      ((blockedPct + excessPct) / 2) * 0.2;
    const mixedBonus = patternKey === "mixed" ? 8 : 0;
    return round(base + mixedBonus);
  }

  function buildHealingPace(report) {
    if (report.overall >= 80 && report.coherence >= 75 && report.avgPressure < 38) {
      return {
        label: "整體偏安穩",
        copy: "你的系統整體仍有不錯的自我修復力，現在比較適合做的是穩穩維持，而不是大幅度翻修自己。",
      };
    }

    if (report.overall >= 70 && report.avgPressure >= 48) {
      return {
        label: "有資源但也有過勞",
        copy: "你不是沒有力量，而是有些高分輪位其實帶著用力感。這個階段重點不是再更努力，而是不要把強項也用到透支。",
      };
    }

    if (report.coherence < 58 && report.avgPressure >= 45) {
      return {
        label: "分段失速中",
        copy: "現在比較像不是整體都差，而是某幾段接不上，所以你會一下能撐、一下又很容易漏氣。照顧重點要放在斷點與轉換，而不是平均出力。",
      };
    }

    if (report.overall >= 65 && report.coherence >= 62) {
      return {
        label: "正在慢慢回穩",
        copy: "你不是整體散掉，而比較像在回穩路上。這個階段最需要的不是再更努力，而是給修復一點時間。",
      };
    }

    if (report.overall >= 50) {
      return {
        label: "有點累了",
        copy: "你的系統還在運作，但最近明顯比較疲累，修復的節奏會比衝刺更重要。",
      };
    }

    return {
      label: "很需要被安放",
      copy: "有些部分可能真的已經撐很久了。現在不是證明自己能不能扛，而是讓最累的地方先被抱住。",
    };
  }

  function buildReadingMode(report) {
    if (report.confidence >= 0.85) {
      return {
        label: "可以安心參考",
        copy: "你可以把這份結果當成一張相對清楚的地圖來看，因為答案和你當下的主觀狀態大致貼近。",
      };
    }

    if (report.confidence >= 0.7) {
      return {
        label: "保留一些彈性",
        copy: "這份結果仍然有參考價值，適合拿來看大方向與重點輪位；若碰到很細的差異，可以用比較溫柔的方式理解。",
      };
    }

    return {
      label: "先當作當下切片",
      copy: "今天的答案可能比較受到當下疲累、急迫或保護模式影響，所以先把它當成一張此刻的內在快照就好，不必急著下定論。",
    };
  }

  function describeOverallBalance(report) {
    const pace = buildHealingPace(report);

    if (report.overall >= 85 && report.avgPressure < 35) {
      return `整體來看，你的系統有相當好的整合度，多數輪位都保有自然流動。${pace.copy}`;
    }

    if (report.overall >= 75 && report.avgPressure >= 48) {
      return `整體基礎仍不差，但不是完全輕鬆的穩。你有一些地方還能運作得很好，只是其中一部分其實已經帶著用力與消耗。${pace.copy}`;
    }

    if (report.overall >= 70) {
      return `整體基礎其實不差，你的內在仍有不少可以依靠的地方，只是局部有些位置最近比較緊。${pace.copy}`;
    }

    if (report.coherence < 58 && report.overall >= 55) {
      return `你不是整個人都散掉，而是不同輪位之間的步調差得有點多，所以日常裡容易出現一段能撐、一段又明顯沒力的落差。${pace.copy}`;
    }

    if (report.overall >= 55) {
      return `整體還撐得住，但不是沒有代價。你大概已經用不少力氣在維持日常，而身體和情緒其實都在提醒你慢一點。${pace.copy}`;
    }

    if (report.overall >= 40) {
      return `最近的你可能已經不是單純累，而是有幾個核心位置長期在耗能，所以整體會顯得比較緊繃與不穩。${pace.copy}`;
    }

    return `這一段時間，你的系統確實辛苦了。當分數落在這裡，通常不是因為你不努力，而是太多地方都已經撐了很久。${pace.copy}`;
  }

  function describeChakraState(chakra) {
    if (chakra.finalPct >= 82 && chakra.pressurePct < 28) {
      return "這一輪現在像一個相對安穩的空間，能量進出自然，不太需要靠防衛或補償來維持。";
    }

    if (chakra.finalPct >= 72 && chakra.pressurePct >= 40) {
      return "這一輪表面仍有功能，但裡面其實帶著撐住的張力，表示你不是沒資源，而是這些資源最近用得有點辛苦。";
    }

    if (chakra.finalPct >= 72 && chakra.pressurePct < 40) {
      return "這一輪整體偏穩，就算偶爾有波動，也還有能力慢慢回到自己。";
    }

    if (chakra.finalPct >= 60 && chakra.balancedPct >= 62 && chakra.pressurePct >= 40) {
      return "這一輪其實不是沒有資源，而是最近比較像在邊撐邊回穩，所以敏感度會高一些。";
    }

    if (chakra.patternKey === "blocked" && chakra.blockedPct >= 60) {
      return "這一輪的保護殼比較厚，像已經默默退後一段時間，不一定會大聲喊累，但很多真實需要其實都被收得很後面。";
    }

    if (chakra.patternKey === "excess" && chakra.excessPct >= 60) {
      return "這一輪的用力感偏重，像一直靠提高輸出來維持表面節奏，所以外面看起來還在動，裡面卻可能已經很累。";
    }

    if (chakra.patternKey === "blocked" && chakra.finalPct < 45) {
      return "這一輪比較像把自己輕輕縮了起來，先減少暴露、減少消耗，像在保護一個已經有點累的自己。";
    }

    if (chakra.patternKey === "excess" && chakra.finalPct < 45) {
      return "這一輪比較像在努力撐住表面節奏，外面看起來也許還在動，但裡面其實已經很想休息。";
    }

    if (chakra.patternKey === "mixed" && chakra.pressurePct >= 52) {
      return "這一輪的拉扯感比較大，像一邊想退、一邊又逼自己快點撐起來，所以會特別耗神。";
    }

    if (chakra.finalPct < 38) {
      return "這一輪現在真的很需要被安放，不用急著把它變好，先讓它感覺到安全會更重要。";
    }

    if (chakra.finalPct >= 55) {
      return "這一輪還有可用功能，只是最近比較敏感，壓力一高時就容易偏掉。";
    }

    return "這一輪最近明顯比較疲累，已經不只是小波動，而是值得先慢慢照顧的核心位置。";
  }

  function describePatternSummary(chakra) {
    if (chakra.patternKey === "balanced") {
      return chakra.pressurePct < 25
        ? "閉塞與過度都相對低，表示這裡的流動還算自然，現在更需要的是溫柔維持。"
        : chakra.pressurePct >= 40
          ? "雖然整體仍算穩，但底下已有一層明顯緊繃，表示這裡不是沒有壓力，而是你還在努力把它維持住。"
          : "雖然整體仍算穩，但底下仍有一點緊繃，表示這裡不是沒有壓力，只是你還撐得住。";
    }

    if (chakra.patternKey === "blocked") {
      return chakra.blockedPct >= 60
        ? "這裡的保護殼比較厚，壓力來時很可能先安靜、退後、斷開感受，避免再被碰痛。"
        : "這裡偏向收縮型保護，壓力來時容易先縮回去、停住或把感受藏起來。";
    }

    if (chakra.patternKey === "excess") {
      return chakra.excessPct >= 60
        ? "這裡的用力感比較重，壓力來時很可能先加速、先解釋、先控制，像在努力不要讓自己垮下來。"
        : "這裡偏向補償型保護，壓力來時容易先往外出力，試著用動作和反應把不安壓住。";
    }

    return chakra.imbalanceGap < 8
      ? "這裡同時有收縮和補償，兩邊差不多高，像一邊想躲、一邊又怕自己不夠撐，內耗會特別明顯。"
      : "這裡既有收住自己的部分，也有不自覺撐過頭的部分，所以節奏容易忽緊忽鬆。";
  }

  function buildChakraResourceCopy(chakra, meta) {
    if (chakra.balancedPct >= 78 && chakra.pressurePct < 35) {
      return `平衡題 ${chakra.balancedPct}%，表示這個部分仍保留著很可貴的穩定度。當你回到自己時，通常能自然展現 ${meta.resource}。`;
    }

    if (chakra.balancedPct >= 78) {
      return `平衡題 ${chakra.balancedPct}%，表示這個部分其實很有底子。只是最近不是完全輕鬆地穩，而比較像在帶著壓力維持，所以它也需要被好好保養。`;
    }

    if (chakra.balancedPct >= 63) {
      return `平衡題 ${chakra.balancedPct}%，表示這裡其實有資源，只是最近比較像在間歇性地亮起來。你不是沒有，只是暫時不夠穩。`;
    }

    if (chakra.balancedPct >= 48) {
      return `平衡題 ${chakra.balancedPct}%，表示這裡還有一些火種，只是目前比較弱，需要更溫柔、規律地陪它長回來。`;
    }

    return `平衡題 ${chakra.balancedPct}%，顯示 ${meta.focus} 這個核心功能最近不容易被穩定調動。這不是空掉了，而是它現在更需要基礎照顧，而不是更大的要求。`;
  }

  function buildChakraImbalanceCopy(chakra, meta) {
    if (chakra.patternKey === "balanced") {
      return chakra.pressurePct >= 40
        ? `這裡的閉塞 ${chakra.blockedPct}%、過度 ${chakra.excessPct}% 雖然沒有壓過主分數，但底下仍有張力，表示它目前像一個正在穩住局面的輪位，而不是完全放鬆。`
        : `這裡的閉塞 ${chakra.blockedPct}%、過度 ${chakra.excessPct}% 都不算高，表示它不是現在最需要擔心的位置。不過當其他輪位太累時，它仍可能被連帶拖緊，所以照顧上以穩定維持為主。`;
    }

    if (chakra.patternKey === "blocked") {
      return chakra.blockedPct >= 60
        ? `閉塞 ${chakra.blockedPct}% 明顯高於過度 ${chakra.excessPct}%，代表你比較容易透過收住自己來保護內在。${meta.blockTheme}。這種狀態常讓外表看起來還好，但裡面其實已經退得很後面。`
        : `閉塞 ${chakra.blockedPct}% 高於過度 ${chakra.excessPct}%，代表你比較容易透過收住自己來保護內在。${meta.blockTheme}。這種狀態不一定很劇烈，但會讓你慢慢變得更難感覺到自己。`;
    }

    if (chakra.patternKey === "excess") {
      return chakra.excessPct >= 60
        ? `過度活躍 ${chakra.excessPct}% 明顯高於閉塞 ${chakra.blockedPct}%，代表你比較容易透過出力來保護自己。${meta.excessTheme}。這通常不是能量真的很多，而是焦慮下的努力撐住。`
        : `過度活躍 ${chakra.excessPct}% 高於閉塞 ${chakra.blockedPct}%，代表你比較容易透過出力來保護自己。${meta.excessTheme}。表面會像很有反應，但底下常是怕自己一停就垮。`;
    }

    return `閉塞 ${chakra.blockedPct}% 與過度 ${chakra.excessPct}% 同時偏高，表示這裡既想保護自己，又很怕一鬆就失去平衡。你可能會在「${meta.blockTheme.replace(
      "容易",
      ""
    )}」與「${meta.excessTheme.replace("容易", "")}」之間來回，這通常也是最耗能的情況。`;
  }

  function buildChakraTriggerCopy(chakra, meta) {
    if (chakra.patternKey === "balanced") {
      return chakra.pressurePct < 30
        ? `和 ${meta.focus} 有關的情境目前不太像主要雷區。若有波動，多半是外在累積太久，才暫時把這一輪連帶拖緊。`
        : `當情境同時碰到 ${meta.focus}，又需要快速回應外界時，這一輪仍可能先緊起來。不過它通常還有機會慢慢回到原本節奏。`;
    }

    if (chakra.patternKey === "blocked") {
      return chakra.blockedPct >= 60
        ? `一遇到和 ${meta.focus} 有關、又伴隨暴露感、評價感或不確定的場景時，你可能很快先往內收，甚至連自己真正的感受都一起關小。`
        : `只要碰到和 ${meta.focus} 有關、又需要立刻表態或承受壓力的情境，這一輪就比較容易先縮回去。`;
    }

    if (chakra.patternKey === "excess") {
      return chakra.excessPct >= 60
        ? `一碰到和 ${meta.focus} 有關、又讓你感到失控、被忽略或來不及的場面時，你通常會馬上加大輸出，想先把局面撐住。`
        : `和 ${meta.focus} 有關的事情只要一緊，你就比較容易先反應、先出力，讓自己不要落到被動位置。`;
    }

    return chakra.pressurePct >= 55
      ? `當情境同時帶著靠近與風險、期待與壓力時，這一輪最容易先亂掉，因為你會一邊想退、一邊又不敢真的放下。`
      : `和 ${meta.focus} 有關的場景若帶著模糊、拉扯或雙重要求，這一輪就容易忽緊忽鬆。`;
  }

  function buildChakraDailyLifeCopy(chakra, meta) {
    if (chakra.patternKey === "balanced") {
      return chakra.pressurePct >= 40
        ? `在日常裡，你多半還是能把 ${meta.focus} 這個主題運作起來，只是很多時候是在默默扛著，因此別人未必看得出你其實已經有點累。`
        : `在日常裡，你多半能在 ${meta.focus} 相關議題上維持基本節奏，遇到狀況時比較有機會回到自己，而不是立刻被反應帶走。`;
    }

    if (chakra.patternKey === "blocked") {
      return `在日常裡，這可能表現成少說、少要、少感覺、少主動。表面不一定劇烈，但很多本來屬於你的需要、界線或真實感受，會被你默默往後放。`;
    }

    if (chakra.patternKey === "excess") {
      return `在日常裡，這可能表現成先解釋、先扛、先推、先修補、先控制。事情表面有在動，但代價常常是你自己很難真正停下來。`;
    }

    return `在日常裡，這可能一下很投入、一下很抽離；一下想講清楚、一下又整個關掉。旁人可能不一定跟得上，你自己也會更容易內耗。`;
  }

  function buildChakraFeelingCopy(chakra, meta) {
    const feelingKey = chakra.patternKey === "balanced" ? "balanced" : chakra.patternKey;
    const base = meta.feelings[feelingKey];
    const pressureLine =
      chakra.pressurePct >= 55
        ? "這種狀態通常不只是情緒上的累，而會讓整個人都帶著一種持續消耗感。"
        : chakra.pressurePct >= 40
          ? "你可能不是每一天都這麼明顯，但一碰到特定情境，這種感受就會很快浮上來。"
          : "整體壓力還不算最重，表示這裡雖然敏感，但仍有回來的空間。";

    return `${base} ${pressureLine}`;
  }

  function buildChakraGuidanceCopy(chakra, meta) {
    if (chakra.patternKey === "balanced") {
      return chakra.pressurePct >= 40
        ? `${meta.practice}。這一輪雖然還能運作，但已經有點在代償，所以重點不是再加碼開發，而是讓它有休息空間。`
        : `${meta.practice}。這一輪不是急救區，更適合用規律、輕柔、可持續的方式陪它維持，不需要過度介入。`;
    }

    if (chakra.patternKey === "blocked") {
      return chakra.finalPct < 40
        ? `${meta.practice}。這一輪的重點不是逼自己立刻打開，而是先讓自己慢慢感到安全，直到不需要一直縮回去。`
        : `${meta.practice}。先從小幅度恢復感覺、需求與在場感就好，不必一開始就要求自己很外放或很坦白。`;
    }

    if (chakra.patternKey === "excess") {
      return chakra.excessPct >= 60
        ? `${meta.practice}。這一輪先從減速開始，讓力量從反射式用力，慢慢回到可選擇、可調節的輸出。`
        : `${meta.practice}。先練習不要每次都第一時間衝出去處理，讓回應和行動之間多一點停頓。`;
    }

    return `${meta.practice}。這一輪要先穩住節奏，再慢慢分辨自己是在害怕、在用力，還是在兩者之間來回，這樣修復才不會變成另一種勉強。`;
  }

  function buildChakraCautionCopy(chakra) {
    if (chakra.patternKey === "balanced") {
      return chakra.pressurePct >= 40
        ? `先不要把這一輪也變成新的修復 KPI。它現在更需要的是減壓與維持，而不是再加更多方法逼自己做到更好。`
        : `先不要因為它目前比較穩，就過度檢查自己有沒有做對。穩定本身就值得被保留，不需要一直被測試。`;
    }

    if (chakra.patternKey === "blocked") {
      return chakra.finalPct < 40
        ? `先不要要求自己一次打開、一次說清楚、一次面對到底。這一輪需要的是安全與節奏，不是突破表現。`
        : `先不要把退縮解讀成失敗。若你一感到卡就逼自己更外放，這一輪通常只會縮得更深。`;
    }

    if (chakra.patternKey === "excess") {
      return `先不要再用更努力、更快、更懂事、更有控制力來救這一輪。它現在要學的不是更強，而是可以停。`;
    }

    return `先不要在「完全躲開」和「突然很用力」之間大幅擺盪。先把幅度縮小、把節奏看清楚，會比立刻做大改變更有效。`;
  }

  function buildChakraAffirmationCopy(chakra, meta) {
    const extra =
      chakra.finalPct < 40
        ? "現在慢一點，不代表你退步，而是在替自己留出重新長回來的空間。"
        : chakra.patternKey === "mixed"
          ? "當你發現自己一下想躲、一下又想撐時，也不用責怪自己，那只是系統在努力找平衡。"
          : chakra.patternKey === "excess"
            ? "你不需要一直維持強度，放慢一點，反而比較能讓真正的力量回來。"
            : chakra.patternKey === "blocked"
              ? "你不需要立刻打開全部，只要願意比昨天多感覺自己一點點，就已經很好。"
              : "這個部分其實已經做得不錯，允許自己在穩定裡休息，而不是一直檢查有沒有做對。";

    return `${meta.affirmation} ${extra}`;
  }

  function getOrderedQuestions() {
    return state.order.map((id) => questionMap.get(id)).filter(Boolean);
  }

  function isFullyAnswered() {
    return questions.every((question) => Number.isFinite(Number(state.answers[question.id])));
  }

  function normalize(value) {
    return (Number(value) - 1) / 6;
  }

  function mean(values) {
    if (!values.length) return 0;
    return values.reduce((sum, value) => sum + value, 0) / values.length;
  }

  function stddev(values) {
    if (!values.length) return 0;
    const average = mean(values);
    const variance = mean(values.map((value) => (value - average) ** 2));
    return Math.sqrt(variance);
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function round(value) {
    return Math.round(value);
  }

  function computeLongestRun(values) {
    if (!values.length) return 0;
    let longest = 1;
    let current = 1;

    for (let index = 1; index < values.length; index += 1) {
      if (values[index] === values[index - 1]) {
        current += 1;
      } else {
        current = 1;
      }
      if (current > longest) longest = current;
    }

    return longest;
  }

  function generateQuestionOrder(allQuestions) {
    const candidates = shuffle(
      allQuestions.map((question) => ({
        id: question.id,
        chakraId: question.chakraId,
        type: question.type,
      }))
    );

    const ordered = [];

    while (candidates.length > 0) {
      let insertIndex = candidates.findIndex((candidate) => isPlacementAcceptable(ordered, candidate));
      if (insertIndex === -1) insertIndex = 0;
      ordered.push(candidates.splice(insertIndex, 1)[0]);
    }

    return ordered.map((item) => item.id);
  }

  function isPlacementAcceptable(ordered, candidate) {
    if (ordered.length < 2) return true;

    const last = ordered[ordered.length - 1];
    const secondLast = ordered[ordered.length - 2];
    const sameChakraStreak = last.chakraId === candidate.chakraId && secondLast.chakraId === candidate.chakraId;
    const sameTypeStreak = last.type === candidate.type && secondLast.type === candidate.type;

    return !sameChakraStreak && !sameTypeStreak;
  }

  function shuffle(items) {
    const cloned = items.slice();
    for (let index = cloned.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      [cloned[index], cloned[swapIndex]] = [cloned[swapIndex], cloned[index]];
    }
    return cloned;
  }

  function exportResults() {
    if (!isFullyAnswered()) {
      window.alert("請先完成測驗後再匯出結果。");
      return;
    }

    const report = computeReport();
    const payload = {
      metadata: {
        version: 3,
        sessionId: state.sessionId,
        startedAt: new Date(state.startedAt).toISOString(),
        completedAt: new Date(state.completedAt || Date.now()).toISOString(),
      },
      report,
      answers: Object.fromEntries(
        questions.map((question) => [question.id, Number(state.answers[question.id])])
      ),
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `chakra-assessment-${new Date()
      .toISOString()
      .slice(0, 10)}.json`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
  }
})();
