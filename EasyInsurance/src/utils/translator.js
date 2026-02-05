// 약관 번역 유틸리티 - 어려운 보험 용어를 쉬운 말로 바꿔주는 기능

// 한자어 → 쉬운 말 매핑
const termDictionary = {
  // 사람 관련
  '피보험자': '보험 대상자(보호받는 사람)',
  '보험계약자': '보험 가입자(돈 내는 사람)',
  '보험수익자': '보험금 받는 사람',
  '계약자': '가입한 사람',
  '수익자': '돈 받는 사람',

  // 돈 관련
  '보험료': '보험에 내는 돈',
  '보험금': '보험에서 받는 돈',
  '해약환급금': '해지하면 돌려받는 돈',
  '환급금': '돌려받는 돈',
  '납입': '내는 것',
  '지급': '주는 것',
  '청구': '달라고 신청하는 것',
  '면제': '안 내도 되는 것',

  // 기간 관련
  '면책기간': '보험금 못 받는 기간',
  '감액기간': '보험금 적게 받는 기간',
  '납입기간': '돈 내는 기간',
  '보장기간': '보호받는 기간',
  '만기': '보험이 끝나는 날',
  '갱신': '다시 계약하는 것',

  // 계약 관련
  '고지의무': '건강상태 알려야 하는 의무',
  '통지의무': '알려야 하는 의무',
  '고지': '알리는 것',
  '약관': '보험 규칙',
  '특약': '추가 옵션',
  '주계약': '기본 보험',
  '부활': '해지된 보험 다시 살리기',
  '효력상실': '보험이 멈춘 상태',

  // 보장 관련
  '보장': '보호',
  '담보': '보장해주는 것',
  '면책': '보험금 안 주는 경우',
  '부담보': '보장 안 해주는 것',
  '진단금': '병 걸리면 주는 돈',
  '입원일당': '입원하면 하루에 주는 돈',
  '수술비': '수술하면 주는 돈',
  '실손': '실제로 쓴 만큼',

  // 상태 관련
  '기왕증': '이미 있던 병',
  '질병': '병',
  '상해': '다침',
  '사망': '죽음',
  '후유장해': '사고 후 남은 장애',

  // 기타
  '즉시': '바로',
  '경과': '지난',
  '해당': '맞는',
  '상기': '위의',
  '하기': '아래의',
  '기재': '적힌',
  '명시': '적어놓은',
  '소정': '정해진',
  '익일': '다음 날',
  '전항': '위 내용',
  '동': '같은',
  '및': '그리고',
  '또는': '혹은',
  '단': '다만',
  '의거': '따라',
  '준용': '똑같이 적용',
};

// 복잡한 문장 패턴 → 쉬운 문장
const sentencePatterns = [
  {
    pattern: /피보험자가 보험기간 중에/g,
    replacement: '보험 대상자가 보험 기간 동안에',
  },
  {
    pattern: /보험금을 지급하지 아니합니다/g,
    replacement: '보험금을 드리지 않아요',
  },
  {
    pattern: /보험금을 지급합니다/g,
    replacement: '보험금을 드려요',
  },
  {
    pattern: /청구하여야 합니다/g,
    replacement: '신청해야 해요',
  },
  {
    pattern: /하여야 합니다/g,
    replacement: '해야 해요',
  },
  {
    pattern: /할 수 있습니다/g,
    replacement: '할 수 있어요',
  },
  {
    pattern: /없습니다/g,
    replacement: '없어요',
  },
  {
    pattern: /있습니다/g,
    replacement: '있어요',
  },
  {
    pattern: /않습니다/g,
    replacement: '않아요',
  },
  {
    pattern: /됩니다/g,
    replacement: '돼요',
  },
  {
    pattern: /입니다/g,
    replacement: '이에요',
  },
  {
    pattern: /의 경우/g,
    replacement: '일 때',
  },
  {
    pattern: /에 해당하는 경우/g,
    replacement: '에 맞을 때',
  },
  {
    pattern: /에 한하여/g,
    replacement: '만',
  },
  {
    pattern: /으로 인하여/g,
    replacement: ' 때문에',
  },
  {
    pattern: /로 인하여/g,
    replacement: ' 때문에',
  },
  {
    pattern: /에 의하여/g,
    replacement: '에 따라',
  },
];

// 메인 번역 함수
export const translateClause = (text) => {
  if (!text || typeof text !== 'string') {
    return '';
  }

  let translated = text;

  // 1. 단어 치환
  Object.entries(termDictionary).forEach(([term, easy]) => {
    const regex = new RegExp(term, 'g');
    translated = translated.replace(regex, easy);
  });

  // 2. 문장 패턴 치환
  sentencePatterns.forEach(({ pattern, replacement }) => {
    translated = translated.replace(pattern, replacement);
  });

  return translated;
};

// 번역 전후 비교를 위한 함수
export const getTranslationComparison = (text) => {
  return {
    original: text,
    translated: translateClause(text),
  };
};

// 예시 약관 문장들
export const sampleClauses = [
  {
    id: 1,
    title: '보험금 지급',
    original: '피보험자가 보험기간 중에 질병으로 인하여 사망한 경우 보험수익자에게 사망보험금을 지급합니다.',
  },
  {
    id: 2,
    title: '면책 조항',
    original: '피보험자가 고의로 자신을 해친 경우에는 보험금을 지급하지 아니합니다. 단, 피보험자가 심신상실 등으로 자유로운 의사결정을 할 수 없는 상태에서 자신을 해친 경우에는 보험금을 지급합니다.',
  },
  {
    id: 3,
    title: '고지의무',
    original: '보험계약자 또는 피보험자는 청약시 청약서에서 질문한 사항에 대하여 알고 있는 사실을 반드시 사실대로 알려야 합니다. 고지의무를 위반한 경우 보험금 지급이 거절될 수 있습니다.',
  },
  {
    id: 4,
    title: '보험료 납입',
    original: '보험계약자는 제1회 보험료를 청약시에 납입하여야 하며, 제2회 이후의 보험료는 납입기일까지 납입하여야 합니다.',
  },
  {
    id: 5,
    title: '해약환급금',
    original: '보험계약자가 보험계약을 해지한 경우 해약환급금을 지급합니다. 단, 보험료를 납입한 기간이 1년 미만인 경우 해약환급금이 없거나 매우 적을 수 있습니다.',
  },
  {
    id: 6,
    title: '갱신 안내',
    original: '이 보험은 갱신형 상품으로, 보장기간 만료일 전일까지 보험계약자가 별도의 의사표시를 하지 않으면 자동으로 갱신됩니다. 갱신시 보험료는 갱신일 현재 피보험자의 연령 및 적용요율에 따라 변경될 수 있습니다.',
  },
];

export default {
  translateClause,
  getTranslationComparison,
  sampleClauses,
  termDictionary,
};
