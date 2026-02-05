// 보험 종류 및 라이프스타일 기반 추천 데이터
export const insuranceTypes = [
  {
    id: 'life',
    name: '생명보험',
    easyName: '가족 보호 보험',
    icon: '👨‍👩‍👧‍👦',
    shortDesc: '내가 없어도 가족이 살 수 있게',
    description: '나에게 큰 일이 생겼을 때 가족이 경제적으로 어렵지 않게 해주는 보험이에요.',
    whoNeeds: ['결혼한 사람', '아이가 있는 사람', '부모님을 모시는 사람', '대출이 있는 사람'],
    avgPrice: '월 3~10만원',
  },
  {
    id: 'health',
    name: '건강보험/의료실비',
    easyName: '병원비 돌려받는 보험',
    icon: '🏥',
    shortDesc: '아프면 병원비 걱정 없이',
    description: '병원에 가면 내가 낸 돈을 돌려받는 보험이에요. 거의 모든 사람에게 필요해요.',
    whoNeeds: ['모든 사람', '특히 건강이 걱정되는 사람', '병원 자주 가는 사람'],
    avgPrice: '월 1~5만원',
  },
  {
    id: 'cancer',
    name: '암보험',
    easyName: '암 걸리면 목돈 받는 보험',
    icon: '🎗️',
    shortDesc: '암 치료에 집중할 수 있게',
    description: '암에 걸리면 치료비로 쓸 수 있는 목돈을 받아요. 실비와 따로 가입하면 좋아요.',
    whoNeeds: ['가족 중 암 환자가 있는 사람', '흡연자', '30대 이상'],
    avgPrice: '월 2~5만원',
  },
  {
    id: 'accident',
    name: '상해보험',
    easyName: '다치면 돈 받는 보험',
    icon: '🩹',
    shortDesc: '사고 나면 치료비 걱정 없이',
    description: '사고로 다치면 치료비를 받는 보험이에요. 운동 좋아하거나 활동적인 사람에게 좋아요.',
    whoNeeds: ['운동을 자주 하는 사람', '야외 활동이 많은 사람', '운전하는 사람'],
    avgPrice: '월 1~3만원',
  },
  {
    id: 'savings',
    name: '저축성보험',
    easyName: '목돈 모으는 보험',
    icon: '🐷',
    shortDesc: '보장도 받고 저축도 하고',
    description: '보험 보장도 받으면서 돈도 모을 수 있어요. 근데 적금보다 이자가 낮을 수 있어요.',
    whoNeeds: ['강제 저축이 필요한 사람', '장기 목표가 있는 사람'],
    avgPrice: '월 10~30만원',
  },
  {
    id: 'pension',
    name: '연금보험',
    easyName: '노후 용돈 보험',
    icon: '👴',
    shortDesc: '은퇴 후에도 매달 용돈처럼',
    description: '지금 돈을 내고 나중에 늙어서 매달 연금처럼 받는 보험이에요.',
    whoNeeds: ['20~40대', '노후 준비하고 싶은 사람', '국민연금만으로 부족한 사람'],
    avgPrice: '월 10~50만원',
  },
];

// 라이프스타일 설문 질문
export const surveyQuestions = [
  {
    id: 'age',
    question: '나이가 어떻게 되세요?',
    type: 'select',
    options: [
      { value: '20s', label: '20대' },
      { value: '30s', label: '30대' },
      { value: '40s', label: '40대' },
      { value: '50s', label: '50대 이상' },
    ],
  },
  {
    id: 'family',
    question: '가족 상황은 어떤가요?',
    type: 'select',
    options: [
      { value: 'single', label: '혼자 살아요' },
      { value: 'married', label: '결혼했어요 (아이 없음)' },
      { value: 'withKids', label: '결혼했고 아이가 있어요' },
      { value: 'parents', label: '부모님을 모시고 있어요' },
    ],
  },
  {
    id: 'job',
    question: '직업 형태는요?',
    type: 'select',
    options: [
      { value: 'office', label: '사무직 (회사원, 공무원 등)' },
      { value: 'physical', label: '현장직 (건설, 배달 등)' },
      { value: 'freelance', label: '프리랜서/자영업' },
      { value: 'student', label: '학생' },
    ],
  },
  {
    id: 'health',
    question: '건강 상태는 어떤가요?',
    type: 'select',
    options: [
      { value: 'good', label: '건강해요' },
      { value: 'normal', label: '보통이에요' },
      { value: 'weak', label: '잔병치레가 있어요' },
      { value: 'chronic', label: '만성질환이 있어요' },
    ],
  },
  {
    id: 'activity',
    question: '여가 활동은 주로?',
    type: 'select',
    options: [
      { value: 'indoor', label: '집에서 쉬어요' },
      { value: 'light', label: '가벼운 운동 (산책, 요가)' },
      { value: 'active', label: '활동적인 운동 (헬스, 등산)' },
      { value: 'extreme', label: '익스트림 스포츠' },
    ],
  },
  {
    id: 'concern',
    question: '가장 걱정되는 건 뭔가요?',
    type: 'multiselect',
    options: [
      { value: 'hospital', label: '병원비' },
      { value: 'cancer', label: '암 같은 큰 병' },
      { value: 'accident', label: '사고' },
      { value: 'family', label: '가족 생계' },
      { value: 'retirement', label: '노후 생활' },
    ],
  },
  {
    id: 'budget',
    question: '보험에 얼마 정도 쓸 수 있어요?',
    type: 'select',
    options: [
      { value: 'low', label: '월 5만원 이하' },
      { value: 'mid', label: '월 5~10만원' },
      { value: 'high', label: '월 10~20만원' },
      { value: 'premium', label: '월 20만원 이상' },
    ],
  },
];

// 추천 로직
export const getRecommendations = (answers) => {
  const recommendations = [];

  // 기본: 실비보험 (거의 모든 사람에게 추천)
  recommendations.push({
    ...insuranceTypes.find(i => i.id === 'health'),
    priority: 1,
    reason: '병원비 걱정 없이 아플 때 치료받을 수 있어요. 거의 모든 사람에게 필수예요!',
  });

  // 가족이 있는 경우 생명보험
  if (answers.family === 'withKids' || answers.family === 'parents') {
    recommendations.push({
      ...insuranceTypes.find(i => i.id === 'life'),
      priority: 2,
      reason: '가족을 책임지고 있으니, 혹시 모를 상황에 가족이 경제적으로 힘들지 않게 대비해요.',
    });
  }

  // 30대 이상이거나 암 걱정하는 경우
  if (answers.age !== '20s' || (answers.concern && answers.concern.includes('cancer'))) {
    recommendations.push({
      ...insuranceTypes.find(i => i.id === 'cancer'),
      priority: 3,
      reason: '암은 누구에게나 생길 수 있어요. 미리 대비하면 치료에만 집중할 수 있어요.',
    });
  }

  // 활동적인 사람이거나 현장직
  if (answers.activity === 'active' || answers.activity === 'extreme' || answers.job === 'physical') {
    recommendations.push({
      ...insuranceTypes.find(i => i.id === 'accident'),
      priority: 4,
      reason: '활동량이 많으면 다칠 위험도 있어요. 상해보험으로 대비하세요.',
    });
  }

  // 노후 걱정하는 경우
  if (answers.concern && answers.concern.includes('retirement')) {
    recommendations.push({
      ...insuranceTypes.find(i => i.id === 'pension'),
      priority: 5,
      reason: '국민연금만으로는 부족할 수 있어요. 지금부터 조금씩 준비하면 나중에 편해요.',
    });
  }

  // 예산에 따른 조정 메시지
  let budgetNote = '';
  if (answers.budget === 'low') {
    budgetNote = '예산이 적다면 실비보험부터 시작하세요. 가장 실용적이에요!';
  } else if (answers.budget === 'premium') {
    budgetNote = '여유가 있다면 종합적으로 보장받을 수 있어요. 하지만 필요한 것만 가입하세요!';
  }

  return {
    recommendations: recommendations.sort((a, b) => a.priority - b.priority),
    budgetNote,
    totalMonthly: calculateTotalCost(recommendations, answers.budget),
  };
};

// 예상 비용 계산
const calculateTotalCost = (recommendations, budget) => {
  const count = recommendations.length;
  const budgetMap = {
    low: '3~5만원',
    mid: '5~10만원',
    high: '10~15만원',
    premium: '15~25만원',
  };
  return budgetMap[budget] || '5~10만원';
};
