import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BarChart3,
  Cloud,
  Database,
  Download,
  Globe,
  LogIn,
  Network,
  Server,
  User,
  Users,
  Zap,
} from "lucide-react";

/**
 * 观海数据大脑首页
 * 上下分层布局：上层核心概念，下层左中右三列服务
 * 设计理念：清晰的视觉层级，突出核心价值
 */

export default function Home() {
  const scrollerRef = useRef<HTMLElement | null>(null);
  const isPagingRef = useRef(false);
  const [activePage, setActivePage] = useState(0);

  const serviceModules = [
    {
      id: "data-service",
      title: "海洋数据服务平台",
      subtitle: "国际合作、主动、请求导向",
      color: "from-blue-500/20 to-cyan-500/20",
      borderColor: "border-blue-500/30",
      services: [
        {
          id: "api-hub",
          icon: Zap,
          name: "海洋数据服务接口",
          desc: "调用支持海洋环境、船舶动态",
          link: "/service/api-hub",
        },
        {
          id: "download",
          icon: Download,
          name: "国际海洋公共数据下载",
          desc: "CMEMS、NOAA等数据源",
          link: "/service/download",
        },
        {
          id: "datasets",
          icon: Database,
          name: "海洋岗位高质量数据集",
          desc: "产品供给与质量保证",
          link: "/service/datasets",
        },
      ],
    },
    {
      id: "data-pool",
      title: "海洋数据资源池",
      subtitle: "汇聚、融合、共享",
      color: "from-green-500/20 to-emerald-500/20",
      borderColor: "border-green-500/30",
      services: [
        {
          id: "scenario",
          icon: BarChart3,
          name: "海洋岗位高质量数据集中心",
          desc: "行业场景数据聚合",
          link: "/pool/scenario",
        },
        {
          id: "public-data",
          icon: Globe,
          name: "国内外公开海洋数据汇聚",
          desc: "全球数据接入与融合",
          link: "/pool/public-data",
        },
        {
          id: "channel",
          icon: Network,
          name: "海洋可信数据空间渠道汇聚",
          desc: "多渠道数据融合支撑",
          link: "/pool/channel",
        },
      ],
    },
  ];

  const heroStats = [
    {
      value: "1000+",
      label: "全球数据集",
      icon: Globe,
    },
    {
      value: "50+",
      label: "API 接口",
      icon: Zap,
    },
    {
      value: "80+",
      label: "合作机构",
      icon: Network,
    },
    {
      value: "200+",
      label: "专家入驻",
      icon: Users,
    },
  ];

  const scrollToPage = useCallback((pageIndex: number) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const nextPage = Math.max(0, Math.min(pageIndex, 1));
    isPagingRef.current = true;
    setActivePage(nextPage);
    scroller.scrollTo({
      top: nextPage * scroller.clientHeight,
      behavior: "smooth",
    });

    window.setTimeout(() => {
      isPagingRef.current = false;
    }, 760);
  }, []);

  const handleWheel = useCallback(
    (event: React.WheelEvent<HTMLElement>) => {
      if (Math.abs(event.deltaY) < 18 || isPagingRef.current) return;

      event.preventDefault();
      scrollToPage(activePage + (event.deltaY > 0 ? 1 : -1));
    },
    [activePage, scrollToPage],
  );

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const handleScroll = () => {
      const nextPage = Math.round(scroller.scrollTop / scroller.clientHeight);
      setActivePage(Math.max(0, Math.min(nextPage, 1)));
    };

    scroller.addEventListener("scroll", handleScroll, { passive: true });
    return () => scroller.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="h-screen overflow-hidden bg-background text-foreground">
      {/* 固定导航栏 */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#003b91] text-white shadow-lg shadow-black/15">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo部分 */}
          <div className="flex items-center gap-3">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663677972124/fG6Wn8CB7X6iCsAifQ7nmi/ocean-brain-logo-NfgQQLz3MTZpXYU8ZqRgGe.webp"
              alt="观海数据大脑"
              className="w-10 h-10"
            />
            <span className="font-bold text-xl hidden sm:inline">观海数据大脑</span>
          </div>

          {/* 中间导航项 - 增大字体和间距 */}
          <div className="hidden lg:flex h-full items-center">
            <a href="/" className="flex h-full items-center bg-[#1f7eea] px-6 text-lg font-semibold text-white transition-colors hover:bg-[#2b88f0]">首页</a>
            <a href="/service/api-hub" className="flex h-full items-center px-6 text-lg font-semibold text-white transition-colors hover:bg-white/10">API Hub</a>
            <a href="/pool/public-data" className="flex h-full items-center px-6 text-lg font-semibold text-white transition-colors hover:bg-white/10">全球公共数据源</a>
            <a href="/service/datasets" className="flex h-full items-center px-6 text-lg font-semibold text-white transition-colors hover:bg-white/10">高质量数据集</a>
            <a href="/pool/channel" className="flex h-full items-center px-6 text-lg font-semibold text-white transition-colors hover:bg-white/10">海洋可信数据空间</a>
          </div>

          {/* 右侧按钮 */}
          <div className="flex items-center gap-3">
            <Button size="sm" variant="ghost" className="hidden md:flex gap-2 text-white hover:bg-white/10 hover:text-white">
              <User className="w-4 h-4" />
              <span>个人中心</span>
            </Button>
            <Button size="sm" variant="outline" className="hidden md:flex border-white/50 bg-transparent text-white hover:bg-white/10 hover:text-white">
              <LogIn className="w-4 h-4 mr-2" />
              登陆
            </Button>
            <Button size="sm" className="bg-[#1f7eea] text-white hover:bg-[#2b88f0]">
              注册
            </Button>
          </div>
        </div>
      </nav>

      <main
        ref={scrollerRef}
        onWheel={handleWheel}
        className="fullpage-scroll h-screen overflow-y-auto scroll-smooth snap-y snap-mandatory overscroll-none"
      >
        {/* 上层：核心概念区域 - 带流动背景 */}
        <section className="relative flex min-h-screen snap-start snap-always items-center overflow-hidden border-b border-border/50 pt-24 pb-10">
          {/* 流动背景 */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663677972124/fG6Wn8CB7X6iCsAifQ7nmi/ocean-wave-animation-Au2vj9LEtHNSJp6L6XYMyn.webp"
              alt="ocean waves"
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background"></div>
          </div>

          {/* 内容 */}
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-8 animate-fade-in-up">
              <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent">
                观海数据大脑
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                汇聚全球海洋数据，赋能智慧决策。
                <br />
                一站式海洋数据服务平台，连接数据、知识与应用。
              </p>
            </div>

            {/* 核心价值展示 - 拉长卡片 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {/* 海洋可信数据底座 - 左侧拉长 */}
              <div className={`p-8 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-2 border-blue-500/30 backdrop-blur-sm card-lift animate-fade-in-left animation-delay-100 lg:col-span-1 ${activePage === 0 ? "page-card-enter-left page-card-reset-delay" : ""}`}>
                <div className="flex items-start gap-4 mb-4">
                  <Cloud className="w-8 h-8 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold">海洋可信数据底座</h3>
                    <p className="text-base text-muted-foreground mt-2 leading-relaxed">
                      建立统一的数据标准和互认机制，实现多源数据的无缝融合与可信共享，为海洋数据的流通提供坚实基础。
                    </p>
                  </div>
                </div>
              </div>

              {/* 中央占位符 */}
              <div className="hidden lg:flex items-center justify-center">
                <div className="relative flex w-full items-center justify-center text-center text-muted-foreground text-sm">
                  <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-blue-500/20 via-accent/60 to-green-500/20"></div>
                  <div className="relative z-10 flex h-20 w-20 flex-col items-center justify-center rounded-full border border-accent/40 bg-card/70 backdrop-blur-sm shadow-lg shadow-accent/10">
                    <Network className="h-7 w-7 text-accent" />
                    <span className="mt-1 text-xs font-semibold text-accent">融合</span>
                  </div>
                </div>
              </div>

              {/* 新型海洋数据基础设施 - 右侧拉长 */}
              <div className={`p-8 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-2 border-green-500/30 backdrop-blur-sm card-lift animate-fade-in-right animation-delay-200 lg:col-span-1 ${activePage === 0 ? "page-card-enter-right page-card-reset-delay" : ""}`}>
                <div className="flex items-start gap-4 mb-4">
                  <Server className="w-8 h-8 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold">新型海洋数据基础设施</h3>
                    <p className="text-base text-muted-foreground mt-2 leading-relaxed">
                      依托中国移动5G/云计算能力，提供高效、安全、可靠的海洋数据服务，支撑海洋数据的存储、处理和应用。
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
              {heroStats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`rounded-lg border border-blue-500/20 bg-card/55 px-4 py-3 text-center backdrop-blur-sm card-lift animate-fade-in-up animation-delay-${(index + 3) * 100}`}
                >
                  <div className="mx-auto mb-2 flex h-11 w-11 -rotate-12 items-center justify-center rounded-xl bg-blue-600/70 shadow-lg shadow-blue-900/30">
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold leading-none text-blue-500">{stat.value}</div>
                  <div className="mt-2 text-sm font-semibold text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 下层：左中右三列服务区域 */}
        <section className="relative flex h-screen snap-start snap-always items-center overflow-hidden pt-20 pb-4">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background"></div>

          <div className="container mx-auto px-4 relative z-10 flex h-full min-h-0 flex-col justify-between gap-4">
            <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-3 gap-5 xl:gap-6">
              {/* 左列：海洋数据服务平台 */}
              <div className={`flex min-h-0 flex-col p-5 xl:p-6 rounded-xl bg-gradient-to-br ${serviceModules[0].color} border-2 ${serviceModules[0].borderColor} backdrop-blur-sm card-lift animate-fade-in-left animation-delay-300 ${activePage === 1 ? "page-card-enter-left page-card-reset-delay" : ""}`}>
                <div className="mb-4">
                  <h2 className="text-2xl font-bold mb-2">{serviceModules[0].title}</h2>
                  <p className="text-sm text-muted-foreground">{serviceModules[0].subtitle}</p>
                </div>

                <div className="space-y-3 flex-1">
                  {serviceModules[0].services.map((service, index) => (
                    <a key={service.id} href={service.link} className="group block">
                      <div className={`p-3 xl:p-4 rounded-lg bg-card/60 border border-border hover:border-accent hover:bg-card transition-all duration-300 cursor-pointer service-item-hover animate-fade-in-up animation-delay-${(index + 4) * 100}`}>
                        <div className="flex items-start gap-3">
                          <service.icon className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-sm">{service.name}</p>
                            <p className="text-xs text-muted-foreground mt-1">{service.desc}</p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-accent flex-shrink-0 mt-0.5 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </a>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-border/50">
                  <Button className="w-full bg-primary hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/50" size="sm">
                    探索服务
                  </Button>
                </div>
              </div>

              {/* 中列：核心架构展示 */}
              <div className="flex flex-col items-center justify-center animate-fade-in-up animation-delay-400">
                {/* 大脑图标 */}
                <div className="w-36 h-36 xl:w-44 xl:h-44 rounded-full bg-gradient-to-br from-primary/40 to-accent/40 border-2 border-accent/60 flex items-center justify-center backdrop-blur-sm hover:border-accent hover:shadow-xl hover:shadow-accent/30 transition-all duration-300 mb-5 animate-float">
                  <div className="text-center">
                    <div className="text-5xl xl:text-6xl mb-2">🧠</div>
                    <p className="text-sm font-bold text-accent">数据大脑</p>
                  </div>
                </div>

                {/* 架构说明 */}
                <div className="text-center">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    <span className="font-semibold text-foreground">通过智能数据大脑</span>
                    <br />
                    连接海洋数据服务平台
                    <br />
                    与海洋数据资源池
                    <br />
                    <span className="text-xs mt-2 block">为用户提供完整的数据解决方案</span>
                  </p>
                </div>
              </div>

              {/* 右列：海洋数据资源池 */}
              <div className={`flex min-h-0 flex-col p-5 xl:p-6 rounded-xl bg-gradient-to-br ${serviceModules[1].color} border-2 ${serviceModules[1].borderColor} backdrop-blur-sm card-lift animate-fade-in-right animation-delay-500 ${activePage === 1 ? "page-card-enter-right page-card-reset-delay" : ""}`}>
                <div className="mb-4">
                  <h2 className="text-2xl font-bold mb-2">{serviceModules[1].title}</h2>
                  <p className="text-sm text-muted-foreground">{serviceModules[1].subtitle}</p>
                </div>

                <div className="space-y-3 flex-1">
                  {serviceModules[1].services.map((service, index) => (
                    <a key={service.id} href={service.link} className="group block">
                      <div className={`p-3 xl:p-4 rounded-lg bg-card/60 border border-border hover:border-accent hover:bg-card transition-all duration-300 cursor-pointer service-item-hover animate-fade-in-up animation-delay-${(index + 7) * 100}`}>
                        <div className="flex items-start gap-3">
                          <service.icon className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-sm">{service.name}</p>
                            <p className="text-xs text-muted-foreground mt-1">{service.desc}</p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-accent flex-shrink-0 mt-0.5 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </a>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-border/50">
                  <Button className="w-full bg-primary hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/50" size="sm">
                    浏览资源
                  </Button>
                </div>
              </div>
            </div>

            {/* 支撑层信息 */}
            <div className="grid shrink-0 grid-cols-1 md:grid-cols-2 gap-3 border-t border-border/50 pt-3">
              {/* 国家海洋可信数据空间 */}
              <div className="p-3 rounded-lg bg-card/70 border border-border hover:border-accent/50 transition-colors card-lift animate-fade-in-left animation-delay-600">
                <div className="flex items-center gap-3 mb-2">
                  <Cloud className="w-5 h-5 text-accent flex-shrink-0" />
                  <h3 className="text-base font-semibold">国家海洋可信数据空间</h3>
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  跨域数据互认与互联 · 数据分级分类管理 · 数据权属记录与溯权 · 安全与隐私保护框架 · 用途控制与合规监管 · 可信交换与互操作机制
                </p>
              </div>

              {/* 中国移动基础设施能力 */}
              <div className="p-3 rounded-lg bg-card/70 border border-border hover:border-accent/50 transition-colors card-lift animate-fade-in-right animation-delay-600">
                <div className="flex items-center gap-3 mb-2">
                  <Server className="w-5 h-5 text-accent flex-shrink-0" />
                  <h3 className="text-base font-semibold">中国移动基础设施能力</h3>
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  信息大数据平台 · 移动云计算与存储 · 5G/5G-A海洋通信网络 · 国际海洋数据下载专网 · 安全与合规保障体系 · 算力网络智能调度
                </p>
              </div>
            </div>

            {/* 页脚 */}
            <footer className="shrink-0 pt-1 text-center text-xs text-muted-foreground">
              <p>&copy; 2024 观海数据大脑. 保留所有权利。</p>
            </footer>
          </div>
        </section>
      </main>
    </div>
  );
}
