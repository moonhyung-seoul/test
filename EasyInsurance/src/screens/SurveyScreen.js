import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { surveyQuestions, getRecommendations } from '../data/insuranceTypes';

const SurveyScreen = ({ navigation }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [recommendations, setRecommendations] = useState(null);

  const currentQuestion = surveyQuestions[currentStep];
  const totalSteps = surveyQuestions.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const handleSelect = (value) => {
    if (currentQuestion.type === 'multiselect') {
      const currentSelections = answers[currentQuestion.id] || [];
      const newSelections = currentSelections.includes(value)
        ? currentSelections.filter(v => v !== value)
        : [...currentSelections, value];
      setAnswers({ ...answers, [currentQuestion.id]: newSelections });
    } else {
      setAnswers({ ...answers, [currentQuestion.id]: value });
    }
  };

  const handleNext = () => {
    if (!answers[currentQuestion.id] ||
        (Array.isArray(answers[currentQuestion.id]) && answers[currentQuestion.id].length === 0)) {
      Alert.alert('선택해주세요', '답변을 선택해주세요!');
      return;
    }

    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // 설문 완료 - 결과 계산
      const result = getRecommendations(answers);
      setRecommendations(result);
      setShowResult(true);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowResult(false);
    setRecommendations(null);
  };

  const isSelected = (value) => {
    if (currentQuestion.type === 'multiselect') {
      return (answers[currentQuestion.id] || []).includes(value);
    }
    return answers[currentQuestion.id] === value;
  };

  // 결과 화면
  if (showResult && recommendations) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.resultContainer}>
          <View style={styles.resultHeader}>
            <Text style={styles.resultEmoji}>🎯</Text>
            <Text style={styles.resultTitle}>당신을 위한 추천!</Text>
            <Text style={styles.resultSubtitle}>
              설문 결과를 바탕으로 추천해드려요
            </Text>
          </View>

          {recommendations.recommendations.map((item, index) => (
            <View key={index} style={styles.recommendCard}>
              <View style={styles.recommendHeader}>
                <Text style={styles.recommendIcon}>{item.icon}</Text>
                <View style={styles.recommendTitleContainer}>
                  <Text style={styles.recommendPriority}>
                    {index === 0 ? '가장 추천!' : `추천 ${index + 1}`}
                  </Text>
                  <Text style={styles.recommendName}>{item.easyName}</Text>
                  <Text style={styles.recommendOriginal}>({item.name})</Text>
                </View>
              </View>
              <Text style={styles.recommendReason}>{item.reason}</Text>
              <View style={styles.priceTag}>
                <Text style={styles.priceLabel}>예상 보험료</Text>
                <Text style={styles.priceValue}>{item.avgPrice}</Text>
              </View>
            </View>
          ))}

          {recommendations.budgetNote && (
            <View style={styles.budgetNote}>
              <Text style={styles.budgetNoteIcon}>💰</Text>
              <Text style={styles.budgetNoteText}>{recommendations.budgetNote}</Text>
            </View>
          )}

          <View style={styles.totalCost}>
            <Text style={styles.totalLabel}>예상 총 보험료</Text>
            <Text style={styles.totalValue}>{recommendations.totalMonthly}</Text>
          </View>

          <View style={styles.disclaimer}>
            <Text style={styles.disclaimerText}>
              * 이 추천은 참고용이에요. 실제 가입 전에 전문 상담을 받아보세요!
            </Text>
          </View>

          <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
            <Text style={styles.resetButtonText}>다시 해볼래요</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // 설문 화면
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
        <Text style={styles.progressText}>
          {currentStep + 1} / {totalSteps}
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.questionContainer}>
        <Text style={styles.questionNumber}>Q{currentStep + 1}</Text>
        <Text style={styles.questionText}>{currentQuestion.question}</Text>

        {currentQuestion.type === 'multiselect' && (
          <Text style={styles.multiSelectHint}>여러 개 선택 가능해요!</Text>
        )}

        <View style={styles.optionsContainer}>
          {currentQuestion.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                isSelected(option.value) && styles.optionButtonSelected,
              ]}
              onPress={() => handleSelect(option.value)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.optionText,
                  isSelected(option.value) && styles.optionTextSelected,
                ]}
              >
                {option.label}
              </Text>
              {isSelected(option.value) && (
                <Text style={styles.checkMark}>✓</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.navigationButtons}>
        {currentStep > 0 && (
          <TouchableOpacity style={styles.prevButton} onPress={handlePrev}>
            <Text style={styles.prevButtonText}>← 이전</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.nextButton, currentStep === 0 && styles.nextButtonFull]}
          onPress={handleNext}
        >
          <Text style={styles.nextButtonText}>
            {currentStep === totalSteps - 1 ? '결과 보기 →' : '다음 →'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  progressContainer: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 10,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4A90D9',
    borderRadius: 4,
  },
  progressText: {
    textAlign: 'right',
    marginTop: 5,
    fontSize: 14,
    color: '#888',
  },
  questionContainer: {
    padding: 20,
    flexGrow: 1,
  },
  questionNumber: {
    fontSize: 16,
    color: '#4A90D9',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  questionText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    lineHeight: 34,
  },
  multiSelectHint: {
    fontSize: 14,
    color: '#888',
    marginBottom: 20,
  },
  optionsContainer: {
    marginTop: 10,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  optionButtonSelected: {
    borderColor: '#4A90D9',
    backgroundColor: '#E3F2FD',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  optionTextSelected: {
    color: '#4A90D9',
    fontWeight: '600',
  },
  checkMark: {
    fontSize: 18,
    color: '#4A90D9',
    fontWeight: 'bold',
  },
  navigationButtons: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  prevButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#E0E0E0',
    marginRight: 10,
    alignItems: 'center',
  },
  prevButtonText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
  nextButton: {
    flex: 2,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#4A90D9',
    alignItems: 'center',
  },
  nextButtonFull: {
    flex: 1,
  },
  nextButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  // 결과 화면 스타일
  resultContainer: {
    padding: 20,
  },
  resultHeader: {
    alignItems: 'center',
    marginBottom: 25,
  },
  resultEmoji: {
    fontSize: 50,
    marginBottom: 10,
  },
  resultTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  resultSubtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  recommendCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  recommendHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  recommendIcon: {
    fontSize: 40,
    marginRight: 15,
  },
  recommendTitleContainer: {
    flex: 1,
  },
  recommendPriority: {
    fontSize: 12,
    color: '#4A90D9',
    fontWeight: 'bold',
    marginBottom: 2,
  },
  recommendName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  recommendOriginal: {
    fontSize: 12,
    color: '#888',
  },
  recommendReason: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
    marginBottom: 12,
  },
  priceTag: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F5F7FA',
    padding: 12,
    borderRadius: 8,
  },
  priceLabel: {
    fontSize: 14,
    color: '#666',
  },
  priceValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A90D9',
  },
  budgetNote: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF9C4',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
  },
  budgetNoteIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  budgetNoteText: {
    flex: 1,
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  totalCost: {
    backgroundColor: '#4A90D9',
    padding: 20,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  totalLabel: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  disclaimer: {
    marginBottom: 20,
  },
  disclaimerText: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
    lineHeight: 18,
  },
  resetButton: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#4A90D9',
    alignItems: 'center',
  },
  resetButtonText: {
    fontSize: 16,
    color: '#4A90D9',
    fontWeight: '600',
  },
});

export default SurveyScreen;
