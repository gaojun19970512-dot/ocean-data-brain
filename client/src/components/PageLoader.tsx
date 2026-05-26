import { useEffect, useState } from 'react';

/**
 * 页面加载动画组件
 * 显示优雅的骨架屏加载效果
 */
export default function PageLoader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // 页面加载完成后隐藏加载屏
    const handleLoad = () => {
      setIsVisible(false);
    };

    // 如果页面已经加载，立即隐藏
    if (document.readyState === 'complete') {
      setIsVisible(false);
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-background overflow-hidden">
      {/* 背景动画 */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 via-background to-background"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* 加载内容 */}
      <div className="relative h-full flex flex-col items-center justify-center">
        {/* Logo骨架 */}
        <div className="mb-12 animate-fade-in-up">
          <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center border border-border/50">
            <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary/30 to-accent/30 animate-pulse"></div>
          </div>
        </div>

        {/* 标题骨架 */}
        <div className="space-y-4 max-w-2xl w-full px-4 animate-fade-in-up animation-delay-100">
          <div className="h-12 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-lg animate-pulse"></div>
          <div className="h-6 bg-gradient-to-r from-muted/20 via-muted/40 to-muted/20 rounded-lg w-3/4 mx-auto animate-pulse" style={{ animationDelay: '0.2s' }}></div>
        </div>

        {/* 卡片骨架 */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl w-full px-4 animate-fade-in-up animation-delay-200">
          <div className="p-6 rounded-xl bg-card/50 border border-border/30 space-y-4">
            <div className="h-6 bg-gradient-to-r from-primary/20 to-accent/20 rounded w-1/2 animate-pulse"></div>
            <div className="h-4 bg-muted/20 rounded animate-pulse"></div>
            <div className="h-4 bg-muted/20 rounded w-5/6 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          </div>
          <div className="p-6 rounded-xl bg-card/50 border border-border/30 space-y-4">
            <div className="h-6 bg-gradient-to-r from-accent/20 to-primary/20 rounded w-1/2 animate-pulse" style={{ animationDelay: '0.1s' }}></div>
            <div className="h-4 bg-muted/20 rounded animate-pulse" style={{ animationDelay: '0.1s' }}></div>
            <div className="h-4 bg-muted/20 rounded w-5/6 animate-pulse" style={{ animationDelay: '0.3s' }}></div>
          </div>
        </div>

        {/* 加载文字 */}
        <div className="mt-16 text-center animate-fade-in-up animation-delay-300">
          <p className="text-muted-foreground text-sm">
            <span className="inline-block">加载中</span>
            <span className="inline-block ml-1">
              <span className="animate-bounce" style={{ animationDelay: '0s' }}>.</span>
              <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>.</span>
              <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>.</span>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
