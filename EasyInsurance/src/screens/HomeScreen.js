import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

const HomeScreen = ({ navigation }) => {
  const features = [
    {
      icon: '📋',
      title: '나한테 맞는 보험 찾기',
      subtitle: '라이프스타일 설문으로 딱 맞는 보험 추천',
      screen: 'Survey',
      color: '#E3F2FD',
    },
    {
      icon: '📖',
      title: '보험 용어 쉽게 보기',
      subtitle: '어려운 한자어, 쉬운 말로 번역',
      screen: 'Dictionary',
      color: '#E8F5E9',
    },
    {
      icon: '📄',
      title: '약관 쉽게 읽기',
      subtitle: '복잡한 약관을 이해하기 쉽게',
      screen: 'Translator',
      color: '#FFF3E0',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* 헤더 영역 */}
        <View style={styles.header}>
          <Text style={styles.logo}>보험쉽게</Text>
          <Text style={styles.tagline}>어렵지 않아요, 보험.</Text>
        </View>

        {/* 환영 메시지 */}
        <View style={styles.welcomeBox}>
          <Text style={styles.welcomeEmoji}>👋</Text>
          <Text style={styles.welcomeTitle}>안녕하세요!</Text>
          <Text style={styles.welcomeText}>
            보험, 어렵고 복잡하게 느껴지셨죠?{'\n'}
            이제 쉽고 친근하게 알아보세요.
          </Text>
        </View>

        {/* 기능 카드들 */}
        <View style={styles.featuresContainer}>
          <Text style={styles.sectionTitle}>뭘 도와드릴까요?</Text>

          {features.map((feature, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.featureCard, { backgroundColor: feature.color }]}
              onPress={() => navigation.navigate(feature.screen)}
              activeOpacity={0.8}
            >
              <Text style={styles.featureIcon}>{feature.icon}</Text>
              <View style={styles.featureTextContainer}>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureSubtitle}>{feature.subtitle}</Text>
              </View>
              <Text style={styles.arrow}>→</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* 하단 팁 */}
        <View style={styles.tipBox}>
          <Text style={styles.tipEmoji}>💡</Text>
          <Text style={styles.tipText}>
            <Text style={styles.tipBold}>Tip!</Text> 보험 처음이라면{' '}
            <Text style={styles.tipHighlight}>'나한테 맞는 보험 찾기'</Text>
            부터 시작해보세요!
          </Text>
        </View>

        {/* 브랜드 메시지 */}
        <View style={styles.brandMessage}>
          <Text style={styles.brandText}>
            젊은 당신을 위한 새로운 보험 경험
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
    paddingBottom: 30,
  },
  header: {
    backgroundColor: '#4A90D9',
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  logo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  tagline: {
    fontSize: 16,
    color: '#E3F2FD',
    marginTop: 5,
  },
  welcomeBox: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    padding: 25,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  welcomeEmoji: {
    fontSize: 40,
    marginBottom: 10,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  featuresContainer: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
    marginBottom: 12,
  },
  featureIcon: {
    fontSize: 36,
    marginRight: 15,
  },
  featureTextContainer: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  featureSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  arrow: {
    fontSize: 24,
    color: '#888',
  },
  tipBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF9C4',
    margin: 20,
    padding: 15,
    borderRadius: 12,
  },
  tipEmoji: {
    fontSize: 24,
    marginRight: 10,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  tipBold: {
    fontWeight: 'bold',
    color: '#333',
  },
  tipHighlight: {
    color: '#4A90D9',
    fontWeight: '600',
  },
  brandMessage: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  brandText: {
    fontSize: 14,
    color: '#888',
    fontStyle: 'italic',
  },
});

export default HomeScreen;
