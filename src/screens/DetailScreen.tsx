import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, FontSize, BorderRadius, Shadow } from '../theme';
import { CATEGORY_COLORS, Chestnut } from '../types';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;

export default function DetailScreen({ route, navigation }: Props) {
  const { chestnut } = route.params;
  const [liked, setLiked] = useState(false);
  const [collected, setCollected] = useState(false);
  const [likeCount, setLikeCount] = useState(chestnut.likes);

  const formatDate = (iso: string) => {
    const date = new Date(iso);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          栗子详情
        </Text>
        <TouchableOpacity
          style={styles.shareButton}
          onPress={() => {}}
        >
          <Ionicons name="share-outline" size={22} color={Colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Category badge */}
        <View style={[styles.categoryBadge, { backgroundColor: CATEGORY_COLORS[chestnut.category] + '18' }]}>
          <Text style={[styles.categoryText, { color: CATEGORY_COLORS[chestnut.category] }]}>
            {chestnut.category}
          </Text>
        </View>

        {/* Title */}
        <Text style={styles.title}>{chestnut.title}</Text>

        {/* Author row */}
        <View style={styles.authorRow}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>{chestnut.avatar}</Text>
          </View>
          <View style={styles.authorInfo}>
            <Text style={styles.authorName}>{chestnut.author}</Text>
            <Text style={styles.dateText}>{formatDate(chestnut.createdAt)}</Text>
          </View>
        </View>

        {/* Content */}
        <View style={styles.contentCard}>
          <Text style={styles.contentText}>{chestnut.content}</Text>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Action bar */}
        <View style={styles.actionBar}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => {
              setLiked(!liked);
              setLikeCount(liked ? likeCount - 1 : likeCount + 1);
            }}
          >
            <Ionicons
              name={liked ? 'heart' : 'heart-outline'}
              size={22}
              color={liked ? Colors.heart : Colors.textSecondary}
            />
            <Text style={[styles.actionText, liked && { color: Colors.heart }]}>
              {likeCount}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={() => {}}>
            <Ionicons name="chatbubble-outline" size={20} color={Colors.textSecondary} />
            <Text style={styles.actionText}>{chestnut.comments}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => setCollected(!collected)}
          >
            <Ionicons
              name={collected ? 'bookmark' : 'bookmark-outline'}
              size={22}
              color={collected ? Colors.accent : Colors.textSecondary}
            />
            <Text style={[styles.actionText, collected && { color: Colors.accent }]}>
              收藏
            </Text>
          </TouchableOpacity>
        </View>

        {/* Related tip */}
        <View style={styles.relatedTip}>
          <Ionicons name="bulb-outline" size={16} color={Colors.accent} />
          <Text style={styles.relatedTipText}>
            这个栗子对你有帮助吗？分享给朋友吧！
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingTop: 56,
    paddingBottom: Spacing.md,
    backgroundColor: Colors.background,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadow.card,
  },
  headerTitle: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.text,
  },
  shareButton: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadow.card,
  },
  scrollContent: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: 60,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.md,
    paddingVertical: 4,
    borderRadius: BorderRadius.sm,
    marginBottom: Spacing.lg,
  },
  categoryText: {
    fontSize: FontSize.sm,
    fontWeight: '700',
  },
  title: {
    fontSize: FontSize.xxl,
    fontWeight: '800',
    color: Colors.text,
    lineHeight: 32,
    marginBottom: Spacing.lg,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xxl,
  },
  avatarContainer: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.surfaceHover,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.primaryLight,
  },
  avatarText: {
    fontSize: 22,
  },
  authorInfo: {
    marginLeft: Spacing.sm,
  },
  authorName: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.text,
  },
  dateText: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    marginTop: 2,
  },
  contentCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.xl,
    ...Shadow.card,
  },
  contentText: {
    fontSize: FontSize.lg,
    color: Colors.text,
    lineHeight: 28,
    letterSpacing: 0.3,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: Spacing.xxl,
  },
  actionBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.xl,
  },
  actionText: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  relatedTip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: Spacing.xxxl,
    padding: Spacing.lg,
    backgroundColor: Colors.surfaceHover,
    borderRadius: BorderRadius.md,
  },
  relatedTipText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
});
