import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { translateClause, sampleClauses } from '../utils/translator';

const TranslatorScreen = () => {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [showExamples, setShowExamples] = useState(true);

  const handleTranslate = () => {
    if (inputText.trim()) {
      const result = translateClause(inputText);
      setTranslatedText(result);
      setShowExamples(false);
    }
  };

  const handleExampleSelect = (clause) => {
    setInputText(clause.original);
    const result = translateClause(clause.original);
    setTranslatedText(result);
    setShowExamples(false);
  };

  const handleClear = () => {
    setInputText('');
    setTranslatedText('');
    setShowExamples(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* 안내 문구 */}
        <View style={styles.infoBox}>
          <Text style={styles.infoEmoji}>📝</Text>
          <Text style={styles.infoText}>
            어려운 약관 문장을 붙여넣으면{'\n'}
            쉬운 말로 바꿔드려요!
          </Text>
        </View>

        {/* 입력 영역 */}
        <View style={styles.inputSection}>
          <Text style={styles.sectionLabel}>원본 약관</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="여기에 약관 문장을 붙여넣으세요..."
              placeholderTextColor="#888"
              multiline
              numberOfLines={5}
              value={inputText}
              onChangeText={setInputText}
              textAlignVertical="top"
            />
          </View>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.clearButton}
              onPress={handleClear}
            >
              <Text style={styles.clearButtonText}>지우기</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.translateButton,
                !inputText.trim() && styles.translateButtonDisabled,
              ]}
              onPress={handleTranslate}
              disabled={!inputText.trim()}
            >
              <Text style={styles.translateButtonText}>쉽게 바꾸기 →</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 번역 결과 */}
        {translatedText && (
          <View style={styles.resultSection}>
            <Text style={styles.sectionLabel}>쉬운 말로 바꾸면</Text>
            <View style={styles.resultContainer}>
              <Text style={styles.resultText}>{translatedText}</Text>
            </View>
            <View style={styles.comparisonNote}>
              <Text style={styles.noteIcon}>✨</Text>
              <Text style={styles.noteText}>
                한자어와 어려운 표현을 쉬운 말로 바꿨어요!
              </Text>
            </View>
          </View>
        )}

        {/* 예시 약관 */}
        {showExamples && (
          <View style={styles.examplesSection}>
            <Text style={styles.sectionLabel}>
              예시 약관으로 체험해보세요
            </Text>
            {sampleClauses.map((clause) => (
              <TouchableOpacity
                key={clause.id}
                style={styles.exampleCard}
                onPress={() => handleExampleSelect(clause)}
                activeOpacity={0.7}
              >
                <View style={styles.exampleHeader}>
                  <Text style={styles.exampleTitle}>{clause.title}</Text>
                  <Text style={styles.tryBadge}>체험하기</Text>
                </View>
                <Text style={styles.exampleText} numberOfLines={2}>
                  {clause.original}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* 하단 안내 */}
        <View style={styles.disclaimer}>
          <Text style={styles.disclaimerText}>
            * 이 번역은 이해를 돕기 위한 것이에요.{'\n'}
            정확한 내용은 원본 약관을 확인하세요!
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3E0',
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
  },
  infoEmoji: {
    fontSize: 28,
    marginRight: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 15,
    color: '#E65100',
    lineHeight: 22,
  },
  inputSection: {
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    overflow: 'hidden',
  },
  textInput: {
    padding: 15,
    fontSize: 15,
    color: '#333',
    minHeight: 120,
    lineHeight: 24,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 12,
  },
  clearButton: {
    flex: 1,
    padding: 14,
    borderRadius: 10,
    backgroundColor: '#E0E0E0',
    alignItems: 'center',
    marginRight: 10,
  },
  clearButtonText: {
    fontSize: 15,
    color: '#666',
    fontWeight: '600',
  },
  translateButton: {
    flex: 2,
    padding: 14,
    borderRadius: 10,
    backgroundColor: '#4A90D9',
    alignItems: 'center',
  },
  translateButtonDisabled: {
    backgroundColor: '#B0BEC5',
  },
  translateButtonText: {
    fontSize: 15,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  resultSection: {
    marginBottom: 20,
  },
  resultContainer: {
    backgroundColor: '#E8F5E9',
    padding: 18,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  resultText: {
    fontSize: 16,
    color: '#2E7D32',
    lineHeight: 26,
  },
  comparisonNote: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    paddingHorizontal: 5,
  },
  noteIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  noteText: {
    fontSize: 13,
    color: '#4CAF50',
  },
  examplesSection: {
    marginBottom: 20,
  },
  exampleCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  exampleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  exampleTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
  },
  tryBadge: {
    fontSize: 12,
    color: '#4A90D9',
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    fontWeight: '600',
  },
  exampleText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  disclaimer: {
    alignItems: 'center',
    paddingTop: 10,
  },
  disclaimerText: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
    lineHeight: 18,
  },
});

export default TranslatorScreen;
