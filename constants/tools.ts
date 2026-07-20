export const sidebarRoutes: NavigationMenuItem[][] = [[
  {
    label: 'Conversation',
    icon: 'lucide:message-square',
    to: '/dashboard/conversation',
  },
  {
    label: 'Code Generator',
    icon: 'lucide:code',
    to: '/dashboard/code',
  },
  {
    label: 'Article Writer',
    icon: 'lucide:square-pen',
    to: '/dashboard/article',
  },
  {
    label: 'Blog Title Generator',
    icon: 'lucide:frame',
    to: '/dashboard/blog',
  },
  {
    label: 'Background Removal',
    icon: 'lucide:eraser',
    to: '/dashboard/remove-background',
  },
  {
    label: 'Object Removal',
    icon: 'lucide:scissors',
    to: '/dashboard/remove-object',
  },
  {
    label: 'Resume Reviewer',
    icon: 'lucide:file-check',
    to: '/dashboard/resume',
  },
]];

export const aiTools = [
  {
    title: "Conversation",
    description: "Engage in natural, intelligent conversations with AI for brainstroming, questions or casual chat",
    icon: "lucide:message-square",
    path: "/dashboard/conversation",
    btnText: "Start Conversation"
  },
  {
    title: "Code Generator",
    description: "Generate clean, efficient and customizable code snippets for various us cases using AI",
    icon: "lucide:code",
    path: "/dashboard/code",
    btnText: "Generate Code"
  },
  {
    title: "Article Writer",
    description: "Craft well-structured and engaging articles on any subject using advanced AI writing assistance",
    icon: "lucide:square-pen",
    path: "/dashboard/article",
    btnText: "Generate Article"
  },
  {
    title: "Blog Title Generator",
    description: "Discover compelling and attention-grabling blog titles instansly with AI-powered suggestions",
    icon: "lucide:frame",
    path: "/dashboard/blog",
    btnText: "Generate Blog Title"
  },
  {
    title: "Background Removal",
    description: "Remove image backgrounds instantly and clearly with our intelligent AI-based remover",
    icon: "lucide:eraser",
    path: "/dashboard/remove-background",
    btnText: "Remove Background"
  },
  {
    title: "Object Removal",
    description: "Easily erase unwanted elements from your photos using our precise AI object remover",
    icon: "lucide:scissors",
    path: "/dashboard/remove-object",
    btnText: "Remove Object"
  },
  {
    title: "Resume Reviewer",
    description: "Enhance your resume with AI-powered insight to boost your chances of getting hired",
    icon: "lucide:file-check",
    path: "/dashboard/resume",
    btnText: "Review Resume"
  },
]