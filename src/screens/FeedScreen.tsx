import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, FontSize, BorderRadius, Shadow } from '../theme';
import { CATEGORIES, CATEGORY_COLORS, Chestnut, Category } from '../types';
import { useChestnuts } from '../store/ChestnutContext';

interface FeedScreenProps {
  navigation: any;
}

export default function FeedScreen({ navigation }: FeedScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const { chestnuts } = useChestnuts();

  const filteredData = useMemo(() => {
    if (!selectedCategory) return chestnuts;
    return chestnuts.filter((item) => item.category === selectedCategory);
  }, [selectedCategory, chestnuts]);

  const formatTime = (iso: string) => {
    const now = new Date();
    const date = new Date(iso);
    const diffMs = now.getTime() - date.getTime();
    const diffH = Math.floor(diffMs / 3600000);
    if (diffH < 1) return '刚刚';
    if (diffH < 24) return `${diffH} 小时前`;
    const diffD = Math.floor(diffH / 24);
    if (diffD < 7) return `${diffD} 天前`;
    return date.toLocaleDateString('zh-CN');
  };

  const renderCategory = (item: Category) => {
    const active = selectedCategory === item;
    return (
      <TouchableOpacity
        key={item}
        style={[
          styles.categoryChip,
          active && { backgroundColor: CATEGORY_COLORS[item] },
        ]}
        onPress={() =>
          setSelectedCategory(selectedCategory === item ? null : item)
        }
        activeOpacity={0.7}
      >
        <Text
          style={[
            styles.categoryChipText,
            active && { color: Colors.white },
          ]}
        >
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderCard = ({ item }: { item: Chestnut }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.9}
      onPress={() => navigation.navigate('Detail', { chestnut: item })}
    >
      {/* Header: avatar + author + time */}
      <View style={styles.cardHeader}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>{item.avatar}</Text>
        </View>
        <View style={styles.headerInfo}>
          <Text style={styles.authorName}>{item.author}</Text>
          <Text style={styles.timeText}>{formatTime(item.createdAt)}</Text>
        </View>
        <View style={[styles.categoryBadge, { backgroundColor: CATEGORY_COLORS[item.category] + '18' }]}>
          <Text style={[styles.categoryBadgeText, { color: CATEGORY_COLORS[item.category] }]}>
            {item.category}
          </Text>
        </View>
      </View>

      {/* Title */}
      <Text style={styles.cardTitle}>{item.title}</Text>

      {/* Content preview */}
      <Text style={styles.cardContent} numberOfLines={3}>
        {item.content}
      </Text>

      {/* Footer: likes & comments */}
      <View style={styles.cardFooter}>
        <View style={styles.statItem}>
          <Ionicons name="heart-outline" size={16} color={Colors.textMuted} />
          <Text style={styles.statText}>{item.likes}</Text>
        </View>
        <View style={styles.statItem}>
          <Ionicons name="chatbubble-outline" size={15} color={Colors.textMuted} />
          <Text style={styles.statText}>{item.comments}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>举个栗子</Text>
          <Text style={styles.headerSubtitle}>每天一个小知识 🌰</Text>
        </View>
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons name="search" size={22} color={Colors.text} />
        </TouchableOpacity>
      </View>

      {/* Category filter */}
      <View style={styles.categoryRow}>
        {CATEGORIES.map(renderCategory)}
      </View>

      {/* List */}
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={renderCard}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ height: Spacing.md }} />}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyEmoji}>🌰</Text>
            <Text style={styles.emptyText}>该分类下还没有栗子</Text>
            <Text style={styles.emptySubtext}>去发布第一个吧！</Text>
          </View>
        )}
      />
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    paddingTop: 60,
    paddingBottom: Spacing.lg,
    backgroundColor: Colors.background,
  },
  headerTitle: {
    fontSize: FontSize.title,
    fontWeight: '800',
    color: Colors.text,
    letterSpacing: 1,
  },
  headerSubtitle: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  searchButton: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadow.card,
  },
  categoryRow: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.lg,
    gap: Spacing.sm,
  },
  categoryChip: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm + 2,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  categoryChipText: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  listContent: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    ...Shadow.card,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  avatarContainer: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.surfaceHover,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 18,
  },
  headerInfo: {
    flex: 1,
    marginLeft: Spacing.sm,
  },
  authorName: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.text,
  },
  timeText: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    marginTop: 1,
  },
  categoryBadge: {
    paddingHorizontal: Spacing.sm + 2,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
  },
  categoryBadgeText: {
    fontSize: FontSize.xs,
    fontWeight: '600',
  },
  cardTitle: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: Spacing.sm,
    lineHeight: 24,
  },
  cardContent: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    lineHeight: 22,
    marginBottom: Spacing.md,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.lg,
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingTop: 80,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: Spacing.lg,
  },
  emptyText: {
    fontSize: FontSize.lg,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  emptySubtext: {
    fontSize: FontSize.md,
    color: Colors.textMuted,
  },
});
