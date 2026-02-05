// 보험 용어 사전 - 한자어/전문용어를 쉬운 말로 번역
export const insuranceTerms = [
  {
    id: 1,
    term: '피보험자',
    origin: '被保險者',
    easy: '보험의 대상이 되는 사람',
    description: '보험에 가입해서 보호를 받는 사람이에요. 예를 들어, 내가 나를 위해 보험에 들면 내가 피보험자예요.',
    example: '"이 보험의 피보험자는 본인입니다" → "이 보험으로 보호받는 사람은 나예요"',
  },
  {
    id: 2,
    term: '보험계약자',
    origin: '保險契約者',
    easy: '보험에 가입하고 돈을 내는 사람',
    description: '보험회사와 계약을 맺고 보험료를 내는 사람이에요. 부모님이 자녀 보험을 들어주면 부모님이 계약자예요.',
    example: '"보험계약자의 의무" → "보험에 가입한 사람이 해야 할 일"',
  },
  {
    id: 3,
    term: '보험수익자',
    origin: '保險受益者',
    easy: '보험금을 받는 사람',
    description: '보험 사고가 생겼을 때 보험금을 받는 사람이에요. 수익자를 따로 정할 수 있어요.',
    example: '"보험수익자 지정" → "보험금 받을 사람 정하기"',
  },
  {
    id: 4,
    term: '보험료',
    origin: '保險料',
    easy: '보험 가입비, 보험에 내는 돈',
    description: '보험에 가입하고 매달(또는 매년) 내는 돈이에요. 월 3만원, 5만원 이런 식으로 정해져요.',
    example: '"월 보험료 50,000원" → "한 달에 내는 보험 가입비 5만원"',
  },
  {
    id: 5,
    term: '보험금',
    origin: '保險金',
    easy: '보험에서 받는 돈',
    description: '사고나 질병이 생겼을 때 보험회사가 주는 돈이에요. 보험료와 헷갈리지 마세요!',
    example: '"보험금 청구" → "보험에서 돈 받기 신청"',
  },
  {
    id: 6,
    term: '해약환급금',
    origin: '解約還給金',
    easy: '보험 해지할 때 돌려받는 돈',
    description: '보험을 중간에 그만둘 때 돌려받는 돈이에요. 가입 기간이 짧으면 거의 못 받을 수 있어요.',
    example: '"해약환급금 조회" → "보험 해지하면 얼마 돌려받는지 확인"',
  },
  {
    id: 7,
    term: '면책기간',
    origin: '免責期間',
    easy: '보험금을 못 받는 기간',
    description: '보험에 가입한 직후 일정 기간 동안은 보험금을 못 받아요. 보통 90일~1년 정도예요.',
    example: '"면책기간 90일" → "가입 후 90일 동안은 보험금을 못 받아요"',
  },
  {
    id: 8,
    term: '감액기간',
    origin: '減額期間',
    easy: '보험금을 조금만 받는 기간',
    description: '면책기간이 지나도 일정 기간은 보험금을 50%만 받는 경우가 있어요.',
    example: '"감액기간 1년" → "1년 동안은 보험금의 절반만 받아요"',
  },
  {
    id: 9,
    term: '고지의무',
    origin: '告知義務',
    easy: '가입할 때 건강 상태를 알려야 하는 의무',
    description: '보험 가입할 때 아픈 곳, 병원 다닌 기록 등을 솔직하게 말해야 해요. 숨기면 나중에 보험금을 못 받을 수 있어요.',
    example: '"고지의무 위반" → "건강 상태를 숨기거나 거짓말한 것"',
  },
  {
    id: 10,
    term: '특약',
    origin: '特約',
    easy: '추가 보장, 옵션',
    description: '기본 보험에 추가로 붙이는 보장이에요. 암 특약, 수술 특약 등을 선택해서 추가할 수 있어요.',
    example: '"암 특약 가입" → "암 보장 옵션 추가"',
  },
  {
    id: 11,
    term: '주계약',
    origin: '主契約',
    easy: '기본 보험, 메인 보장',
    description: '보험의 기본이 되는 부분이에요. 여기에 특약(옵션)을 추가할 수 있어요.',
    example: '"주계약 + 특약 구성" → "기본 보험 + 추가 옵션 구성"',
  },
  {
    id: 12,
    term: '납입기간',
    origin: '納入期間',
    easy: '보험료를 내는 기간',
    description: '보험료를 얼마 동안 내야 하는지를 말해요. 10년납, 20년납 등이 있어요.',
    example: '"납입기간 20년" → "20년 동안 보험료를 내요"',
  },
  {
    id: 13,
    term: '보장기간',
    origin: '保障期間',
    easy: '보험이 나를 보호해주는 기간',
    description: '보험이 적용되는 기간이에요. 80세까지, 100세까지, 평생 등이 있어요.',
    example: '"보장기간 100세" → "100세까지 보험 보호를 받아요"',
  },
  {
    id: 14,
    term: '갱신형',
    origin: '更新型',
    easy: '일정 기간마다 보험료가 바뀌는 보험',
    description: '3년, 5년마다 보험료가 다시 정해지는 보험이에요. 나이가 들면 보험료가 올라가요.',
    example: '"3년 갱신형" → "3년마다 보험료가 다시 정해져요 (보통 올라가요)"',
  },
  {
    id: 15,
    term: '비갱신형',
    origin: '非更新型',
    easy: '보험료가 안 바뀌는 보험',
    description: '가입할 때 정한 보험료가 끝까지 똑같아요. 처음엔 갱신형보다 비싸지만 나중엔 이득일 수 있어요.',
    example: '"비갱신형 보험" → "보험료가 계속 똑같은 보험"',
  },
  {
    id: 16,
    term: '실손보험',
    origin: '實損保險',
    easy: '병원비 돌려받는 보험',
    description: '실제로 쓴 병원비를 돌려받는 보험이에요. 국민건강보험으로 안 되는 부분을 보장해줘요.',
    example: '"실손의료비 청구" → "내가 낸 병원비 돌려받기 신청"',
  },
  {
    id: 17,
    term: '진단금',
    origin: '診斷金',
    easy: '병 걸리면 받는 목돈',
    description: '암, 뇌졸중 같은 큰 병에 걸렸다고 진단받으면 한 번에 받는 돈이에요.',
    example: '"암 진단금 3천만원" → "암에 걸리면 3천만원을 한 번에 받아요"',
  },
  {
    id: 18,
    term: '입원일당',
    origin: '入院日當',
    easy: '입원하면 하루에 받는 돈',
    description: '병원에 입원하면 하루에 얼마씩 받는 돈이에요.',
    example: '"입원일당 5만원" → "입원하면 하루에 5만원씩 받아요"',
  },
  {
    id: 19,
    term: '수술비',
    origin: '手術費',
    easy: '수술하면 받는 돈',
    description: '수술을 받으면 보험에서 주는 돈이에요. 수술 종류에 따라 금액이 달라요.',
    example: '"수술비 특약" → "수술하면 돈 받는 옵션"',
  },
  {
    id: 20,
    term: '보험약관',
    origin: '保險約款',
    easy: '보험 규칙서, 보험 설명서',
    description: '보험의 모든 내용이 적힌 문서예요. 어떤 경우에 보험금을 받는지, 못 받는지 다 적혀 있어요.',
    example: '"약관 확인" → "보험 규칙서 읽어보기"',
  },
];

// 용어 검색 함수
export const searchTerms = (query) => {
  const lowerQuery = query.toLowerCase();
  return insuranceTerms.filter(
    (item) =>
      item.term.toLowerCase().includes(lowerQuery) ||
      item.easy.toLowerCase().includes(lowerQuery) ||
      item.description.toLowerCase().includes(lowerQuery)
  );
};

// 카테고리별 용어 (나중에 확장 가능)
export const termCategories = [
  { id: 'people', name: '사람 관련', terms: [1, 2, 3] },
  { id: 'money', name: '돈 관련', terms: [4, 5, 6, 17, 18, 19] },
  { id: 'period', name: '기간 관련', terms: [7, 8, 12, 13] },
  { id: 'type', name: '보험 종류', terms: [10, 11, 14, 15, 16] },
  { id: 'contract', name: '계약 관련', terms: [9, 20] },
];
