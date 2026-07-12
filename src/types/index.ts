export interface Chestnut {
  id: string;
  title: string;
  content: string;
  category: Category;
  author: string;
  avatar: string;
  likes: number;
  comments: number;
  createdAt: string;
}

export type Category =
  | '编程'
  | '设计'
  | '生活'
  | '学习'
  | '冷知识';

export const CATEGORIES: Category[] = [
  '编程',
  '设计',
  '生活',
  '学习',
  '冷知识',
];

export const CATEGORY_COLORS: Record<Category, string> = {
  '编程': '#3B82F6',
  '设计': '#EC4899',
  '生活': '#10B981',
  '学习': '#8B5CF6',
  '冷知识': '#F59E0B',
};

export const CATEGORY_ICONS: Record<Category, string> = {
  '编程': 'code',
  '设计': 'brush',
  '生活': 'cafe',
  '学习': 'school',
  '冷知识': 'bulb',
};
