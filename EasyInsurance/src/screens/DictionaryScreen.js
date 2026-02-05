import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Modal,
} from 'react-native';
import { insuranceTerms, searchTerms } from '../data/terms';

const DictionaryScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const filteredTerms = searchQuery
    ? searchTerms(searchQuery)
    : insuranceTerms;

  const openTermDetail = (term) => {
    setSelectedTerm(term);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedTerm(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 검색 바 */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="용어 검색 (예: 피보험자, 보험금)"
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Text style={styles.clearButton}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* 안내 문구 */}
      <View style={styles.infoBox}>
        <Text style={styles.infoEmoji}>💡</Text>
        <Text style={styles.infoText}>
          어려운 보험 용어를 쉬운 말로 바꿔드려요!{'\n'}
          카드를 탭하면 자세한 설명을 볼 수 있어요.
        </Text>
      </View>

      {/* 용어 목록 */}
      <ScrollView contentContainerStyle={styles.termsList}>
        {filteredTerms.length === 0 ? (
          <View style={styles.noResult}>
            <Text style={styles.noResultEmoji}>🤔</Text>
            <Text style={styles.noResultText}>
              검색 결과가 없어요.{'\n'}다른 단어로 검색해보세요!
            </Text>
          </View>
        ) : (
          filteredTerms.map((term) => (
            <TouchableOpacity
              key={term.id}
              style={styles.termCard}
              onPress={() => openTermDetail(term)}
              activeOpacity={0.7}
            >
              <View style={styles.termHeader}>
                <Text style={styles.termTitle}>{term.term}</Text>
                <Text style={styles.termOrigin}>{term.origin}</Text>
              </View>
              <View style={styles.arrowContainer}>
                <Text style={styles.arrowDown}>↓</Text>
              </View>
              <Text style={styles.termEasy}>{term.easy}</Text>
              <Text style={styles.tapHint}>탭하여 자세히 보기</Text>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      {/* 상세 모달 */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedTerm && (
              <>
                <View style={styles.modalHeader}>
                  <View>
                    <Text style={styles.modalTitle}>{selectedTerm.term}</Text>
                    <Text style={styles.modalOrigin}>{selectedTerm.origin}</Text>
                  </View>
                  <TouchableOpacity onPress={closeModal}>
                    <Text style={styles.closeButton}>✕</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.modalDivider} />

                <View style={styles.modalSection}>
                  <Text style={styles.sectionLabel}>쉬운 말로</Text>
                  <View style={styles.easyBox}>
                    <Text style={styles.easyText}>{selectedTerm.easy}</Text>
                  </View>
                </View>

                <View style={styles.modalSection}>
                  <Text style={styles.sectionLabel}>자세한 설명</Text>
                  <Text style={styles.descriptionText}>
                    {selectedTerm.description}
                  </Text>
                </View>

                <View style={styles.modalSection}>
                  <Text style={styles.sectionLabel}>예시</Text>
                  <View style={styles.exampleBox}>
                    <Text style={styles.exampleText}>{selectedTerm.example}</Text>
                  </View>
                </View>

                <TouchableOpacity style={styles.gotItButton} onPress={closeModal}>
                  <Text style={styles.gotItButtonText}>이해했어요!</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    margin: 15,
    paddingHorizontal: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 15,
    fontSize: 16,
    color: '#333',
  },
  clearButton: {
    fontSize: 18,
    color: '#888',
    padding: 5,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    marginHorizontal: 15,
    marginBottom: 15,
    padding: 12,
    borderRadius: 10,
  },
  infoEmoji: {
    fontSize: 20,
    marginRight: 10,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: '#4A90D9',
    lineHeight: 20,
  },
  termsList: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  termCard: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 14,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  termHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  termTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 10,
  },
  termOrigin: {
    fontSize: 14,
    color: '#888',
  },
  arrowContainer: {
    alignItems: 'center',
    marginVertical: 5,
  },
  arrowDown: {
    fontSize: 18,
    color: '#4A90D9',
  },
  termEasy: {
    fontSize: 18,
    color: '#4A90D9',
    fontWeight: '600',
    textAlign: 'center',
    backgroundColor: '#E3F2FD',
    padding: 12,
    borderRadius: 8,
  },
  tapHint: {
    fontSize: 12,
    color: '#AAA',
    textAlign: 'right',
    marginTop: 8,
  },
  noResult: {
    alignItems: 'center',
    paddingTop: 50,
  },
  noResultEmoji: {
    fontSize: 50,
    marginBottom: 15,
  },
  noResultText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    lineHeight: 24,
  },
  // 모달 스타일
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 25,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  modalTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  modalOrigin: {
    fontSize: 16,
    color: '#888',
    marginTop: 4,
  },
  closeButton: {
    fontSize: 24,
    color: '#888',
    padding: 5,
  },
  modalDivider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 20,
  },
  modalSection: {
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 14,
    color: '#888',
    marginBottom: 8,
    fontWeight: '600',
  },
  easyBox: {
    backgroundColor: '#4A90D9',
    padding: 15,
    borderRadius: 12,
  },
  easyText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  descriptionText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 26,
  },
  exampleBox: {
    backgroundColor: '#F5F7FA',
    padding: 15,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#4A90D9',
  },
  exampleText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
  },
  gotItButton: {
    backgroundColor: '#4A90D9',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  gotItButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default DictionaryScreen;
