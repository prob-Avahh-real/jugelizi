import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, FontSize, BorderRadius, Shadow } from '../theme';
import { CATEGORIES, CATEGORY_COLORS, CATEGORY_ICONS, Category } from '../types';
import { useChestnuts } from '../store/ChestnutContext';
import { useNavigation } from '@react-navigation/native';

export default function CreateScreen() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<Category | null>(null);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const { addChestnut } = useChestnuts();
  const navigation: any = useNavigation();

  const canSubmit = title.trim() && content.trim() && category;

  const handleSubmit = () => {
    if (!canSubmit) return;
    addChestnut({ title: title.trim(), content: content.trim(), category: category! });
    Alert.alert('🎉 发布成功', '你的栗子已经发布到广场啦！', [
      {
        text: '好的',
        onPress: () => navigation.navigate('FeedTab'),
      },
    ]);
    setTitle('');
    setContent('');
    setCategory(null);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>发布栗子</Text>
          <Text style={styles.headerSubtitle}>分享一个有趣的知识或技巧 🌰</Text>
        </View>

        {/* Title input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>标题</Text>
          <TextInput
            style={styles.titleInput}
            placeholder="给栗子起个名字..."
            placeholderTextColor={Colors.textMuted}
            value={title}
            onChangeText={setTitle}
            maxLength={50}
          />
          <Text style={styles.charCount}>{title.length}/50</Text>
        </View>

        {/* Content input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>内容</Text>
          <TextInput
            style={styles.contentInput}
            placeholder="详细描述你的栗子..."
            placeholderTextColor={Colors.textMuted}
            value={content}
            onChangeText={setContent}
            multiline
            textAlignVertical="top"
            maxLength={500}
          />
          <Text style={styles.charCount}>{content.length}/500</Text>
        </View>

        {/* Category picker */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>分类</Text>
          <View style={styles.categoryGrid}>
            {CATEGORIES.map((cat) => {
              const active = category === cat;
              return (
                <TouchableOpacity
                  key={cat}
                  style={[
                    styles.categoryOption,
                    active && {
                      backgroundColor: CATEGORY_COLORS[cat],
                      borderColor: CATEGORY_COLORS[cat],
                    },
                  ]}
                  onPress={() => setCategory(cat)}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name={CATEGORY_ICONS[cat] as any}
                    size={20}
                    color={active ? Colors.white : CATEGORY_COLORS[cat]}
                  />
                  <Text
                    style={[
                      styles.categoryOptionText,
                      active && { color: Colors.white },
                    ]}
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Image picker placeholder */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>图片（可选）</Text>
          <TouchableOpacity
            style={styles.imagePicker}
            onPress={() => Alert.alert('提示', '图片选择功能即将上线')}
            activeOpacity={0.7}
          >
            <Ionicons name={imageUri ? 'image' : 'camera-outline'} size={28} color={Colors.textMuted} />
            <Text style={styles.imagePickerText}>
              {imageUri ? '已选择图片' : '点击添加图片'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Submit button */}
        <TouchableOpacity
          style={[styles.submitButton, !canSubmit && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={!canSubmit}
          activeOpacity={0.8}
        >
          <Ionicons
            name="send"
            size={20}
            color={canSubmit ? Colors.white : Colors.textMuted}
          />
          <Text
            style={[
              styles.submitText,
              !canSubmit && { color: Colors.textMuted },
            ]}
          >
            发布栗子
          </Text>
        </TouchableOpacity>

        {/* Tip */}
        <View style={styles.tipContainer}>
          <Ionicons name="information-circle-outline" size={18} color={Colors.textMuted} />
          <Text style={styles.tipText}>
            优质的栗子会被推荐到广场首页，获得更多曝光哦 ✨
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: 40,
  },
  header: {
    paddingTop: 60,
    paddingBottom: Spacing.xxl,
  },
  headerTitle: {
    fontSize: FontSize.title,
    fontWeight: '800',
    color: Colors.text,
    letterSpacing: 1,
  },
  headerSubtitle: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  inputGroup: {
    marginBottom: Spacing.xxl,
  },
  label: {
    fontSize: FontSize.md,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  titleInput: {
    fontSize: FontSize.lg,
    color: Colors.text,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadow.card,
  },
  contentInput: {
    fontSize: FontSize.md,
    color: Colors.text,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    minHeight: 140,
    lineHeight: 22,
    ...Shadow.card,
  },
  charCount: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    textAlign: 'right',
    marginTop: 4,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  categoryOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm + 2,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.surface,
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  categoryOptionText: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: Colors.text,
  },
  imagePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    padding: Spacing.lg,
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderStyle: 'dashed',
  },
  imagePickerText: {
    fontSize: FontSize.md,
    color: Colors.textMuted,
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.lg,
    borderRadius: BorderRadius.lg,
    marginTop: Spacing.sm,
    ...Shadow.button,
  },
  submitButtonDisabled: {
    backgroundColor: Colors.border,
    shadowOpacity: 0,
    elevation: 0,
  },
  submitText: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.white,
  },
  tipContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    marginTop: Spacing.lg,
    paddingHorizontal: Spacing.xs,
  },
  tipText: {
    flex: 1,
    fontSize: FontSize.sm,
    color: Colors.textMuted,
    lineHeight: 18,
  },
});
