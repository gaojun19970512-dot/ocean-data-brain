import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
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

const HOME_PAGE_COUNT = 3;
const HOME_ACTIVE_PAGE_STATE_KEY = "oceanDataBrainHomeActivePage";
const HOME_ACTIVE_PAGE_STORAGE_KEY = "ocean-data-brain:home-active-page";

function clampHomePage(pageIndex: number) {
  return Math.max(0, Math.min(pageIndex, HOME_PAGE_COUNT - 1));
}

function getStoredHomePage() {
  if (typeof window === "undefined") return 0;

  const state = window.history.state as Record<string, unknown> | null;
  const pageIndex = state?.[HOME_ACTIVE_PAGE_STATE_KEY];

  if (typeof pageIndex === "number") return clampHomePage(pageIndex);

  const storedPage = Number(
    window.sessionStorage.getItem(HOME_ACTIVE_PAGE_STORAGE_KEY),
  );

  return Number.isFinite(storedPage) ? clampHomePage(storedPage) : 0;
}

function storeHomePage(pageIndex: number) {
  if (typeof window === "undefined") return;

  const currentState =
    typeof window.history.state === "object" && window.history.state !== null
      ? window.history.state
      : {};

  window.history.replaceState(
    {
      ...currentState,
      [HOME_ACTIVE_PAGE_STATE_KEY]: clampHomePage(pageIndex),
    },
    "",
  );

  window.sessionStorage.setItem(
    HOME_ACTIVE_PAGE_STORAGE_KEY,
    String(clampHomePage(pageIndex)),
  );
}

export default function Home() {
  const scrollerRef = useRef<HTMLElement | null>(null);
  const isPagingRef = useRef(false);
  const [activePage, setActivePage] = useState(getStoredHomePage);

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
          link: "#/service/api-hub",
        },
        {
          id: "download",
          icon: Download,
          name: "国际海洋公共数据下载",
          desc: "CMEMS、NOAA等数据源",
          link: "#/service/download",
        },
        {
          id: "datasets",
          icon: Database,
          name: "海洋岗位高质量数据集",
          desc: "产品供给与质量保证",
          link: "#/service/datasets",
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
          link: "#/pool/scenario",
        },
        {
          id: "public-data",
          icon: Globe,
          name: "国内外公开海洋数据汇聚",
          desc: "全球数据接入与融合",
          link: "#/pool/public-data",
        },
        {
          id: "channel",
          icon: Network,
          name: "海洋可信数据空间渠道汇聚",
          desc: "多渠道数据融合支撑",
          link: "#/pool/channel",
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

  const downloadBulletins = [
    { time: "09:12", user: "青岛用户", dataset: "RS_075_气溶胶参数.csv" },
    { time: "09:26", user: "厦门用户", dataset: "Geo_043_海底地形点位.csv" },
    { time: "09:41", user: "上海用户", dataset: "Geo_011_近海岸线.geojson" },
    { time: "10:03", user: "舟山用户", dataset: "Manage_071_滩涂利用统计.xlsx" },
    { time: "10:18", user: "广州用户", dataset: "Env_029_浮游生物统计.csv" },
    { time: "10:36", user: "宁波用户", dataset: "RS_059_海冰遥感.dat" },
    { time: "10:52", user: "深圳用户", dataset: "Env_100_水色透明度.txt" },
    { time: "11:07", user: "大连用户", dataset: "Geo_025_海底地形点位.csv" },
    { time: "11:23", user: "天津用户", dataset: "Manage_041_海洋经济统计.xlsx" },
    { time: "11:45", user: "连云港用户", dataset: "RS_036_赤潮监测产品.csv" },
  ];

  const valueAddedServices = [
    {
      title: "全球海洋公共数据源",
      links: [
        { label: "全球海洋公共数据源汇聚", href: "#/pool/public-data" },
        { label: "多源海洋公共数据枢纽站", href: "#/pool/public-data" },
      ],
      image: "./global-ocean-public-data.png",
      icon: Server,
      accentClass: "border-blue-500/35 from-blue-500/15 to-cyan-500/10",
    },
    {
      title: "中国移动基础设施能力",
      links: [
        { label: "中国移动梧桐大模型", href: "https://bigdata.10086.cn/" },
        { label: "移动云", href: "https://icloud.sh.chinamobile.com/" },
      ],
      image: "./china-mobile-infrastructure.png",
      icon: Cloud,
      accentClass: "border-cyan-500/35 from-cyan-500/15 to-sky-500/10",
    },
    {
      title: "全球海洋数据服务API",
      links: [
        { label: "全球海洋数据API枢纽", href: "#/service/api-hub" },
        { label: "多源服务接口汇聚中心", href: "#/service/api-hub" },
      ],
      image: "./global-ocean-service-api.png",
      icon: Zap,
      accentClass: "border-sky-500/35 from-sky-500/15 to-blue-500/10",
    },
    {
      title: "海洋可信数据空间",
      links: [
        { label: "海洋可信数据交换枢纽", href: "#/pool/channel" },
        { label: "可信数据空间安全网关", href: "#/pool/channel" },
      ],
      image: "./ocean-trusted-data-space.png",
      icon: Network,
      accentClass: "border-emerald-500/35 from-emerald-500/15 to-teal-500/10",
    },
  ];

  const scrollToPage = useCallback((pageIndex: number) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const nextPage = clampHomePage(pageIndex);
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

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const restoredPage = getStoredHomePage();
    setActivePage(restoredPage);
    scroller.scrollTo({
      top: restoredPage * scroller.clientHeight,
      behavior: "instant",
    });
  }, []);

  useEffect(() => {
    storeHomePage(activePage);
  }, [activePage]);

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
      setActivePage(clampHomePage(nextPage));
    };

    scroller.addEventListener("scroll", handleScroll, { passive: true });
    return () => scroller.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="reference-ocean-bg h-screen overflow-hidden text-foreground">
      {/* 固定导航栏 */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black text-white shadow-lg shadow-black/15">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo部分 */}
          <div className="flex items-center gap-3">
            <img
              src="./ocean-brain-icon.png"
              alt="观海数据大脑"
              className="w-10 h-10"
            />
            <span className="font-bold text-xl hidden sm:inline">观海数据大脑</span>
          </div>

          {/* 中间导航项 - 增大字体和间距 */}
          <div className="hidden lg:flex h-full items-center">
            <a href="./marine-fishery-job-datasets.html" className="flex h-full items-center px-4 text-base font-semibold text-white transition-colors hover:bg-white/10 xl:px-5">海洋渔业类岗位数据集</a>
            <a href="./marine-transport-job-datasets.html" className="flex h-full items-center px-4 text-base font-semibold text-white transition-colors hover:bg-white/10 xl:px-5">海洋交通类岗位数据集</a>
            <a href="./marine-public-job-datasets.html" className="flex h-full items-center px-4 text-base font-semibold text-white transition-colors hover:bg-white/10 xl:px-5">海洋公共类岗位数据集</a>
            <a href="./coastal-tourism-job-datasets.html" className="flex h-full items-center px-4 text-base font-semibold text-white transition-colors hover:bg-white/10 xl:px-5">滨海文旅类岗位数据集</a>
            <a href="./marine-vessel-job-datasets.html" className="flex h-full items-center px-4 text-base font-semibold text-white transition-colors hover:bg-white/10 xl:px-5">海洋船舶类岗位数据集</a>
          </div>

          {/* 右侧按钮 */}
          {/* <div className="flex items-center gap-3">
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
          </div> */}
        </div>
      </nav>

      <main
        ref={scrollerRef}
        onWheel={handleWheel}
        className="fullpage-scroll h-screen overflow-y-auto scroll-smooth snap-y snap-mandatory overscroll-none"
      >
        {/* 上层：核心概念区域 - 带流动背景 */}
        <section className="home-hero-section relative flex min-h-screen snap-start snap-always items-center overflow-hidden border-b border-border/50 pt-24 pb-10">
          {/* 流动背景 */}
          <div className="absolute inset-0 z-0 reference-ocean-bg"></div>

          {/* 内容 */}
          <div className="home-hero-inner container mx-auto px-4 relative z-10">
            <div className="home-hero-copy text-center mb-8 animate-fade-in-up">
              <h1 className="home-hero-title text-5xl md:text-6xl font-bold mb-4 text-white">
                观海数据大脑
              </h1>
              <p className="home-hero-subtitle text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                汇聚全球海洋数据，赋能智慧决策。
                <br />
                一站式海洋数据服务平台，连接数据、知识与应用。
              </p>
            </div>

            {/* 核心价值展示 - 拉长卡片 */}
            <div className="home-feature-grid grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {/* 全球海洋科学数据汇聚共享服务中心 - 左侧拉长 */}
              <div className={`home-feature-card p-8 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-2 border-blue-500/30 backdrop-blur-sm card-lift animate-fade-in-left animation-delay-100 lg:col-span-1 ${activePage === 0 ? "page-card-enter-left page-card-reset-delay" : ""}`}>
                <div className="home-feature-row flex items-start gap-4 mb-4">
                  <img
                    src="./ocean-science-logo.svg"
                    alt=""
                    className="home-feature-icon h-16 w-16 flex-shrink-0 rounded-full bg-white object-contain p-1 shadow-lg shadow-blue-900/30"
                  />
                  <div>
                    <h3 className="home-feature-title text-xl font-bold">全球海洋科学数据汇聚共享服务中心</h3>
                    <p className="home-feature-text text-base text-muted-foreground mt-2 leading-relaxed">
                      全球海洋科学数据枢纽<br />
多源高质量标准集成库<br />
全球开放科学共享引擎
                    </p>
                  </div>
                </div>
              </div>

              {/* 数据大脑 */}
              <div className="hidden lg:flex flex-col items-center justify-center animate-fade-in-up animation-delay-400">
                <div className="home-brain w-36 h-36 xl:w-44 xl:h-44 rounded-full bg-gradient-to-br from-primary/40 to-accent/40 border-2 border-accent/60 flex items-center justify-center backdrop-blur-sm hover:border-accent hover:shadow-xl hover:shadow-accent/30 transition-all duration-300 mb-5 animate-float">
                  <div className="text-center">
                    <div className="home-brain-emoji text-5xl xl:text-6xl mb-2">🧠</div>
                    <p className="home-brain-label text-sm font-bold text-accent">数据大脑</p>
                  </div>
                </div>

                <div className="text-center">
                  <p className="home-brain-copy text-sm text-muted-foreground leading-relaxed">
                    <span className="font-semibold text-foreground">通过智能数据大脑</span>
                    {/* <br />
                    连接海洋科学数据与岗位数据集
                    <br />
                    <span className="text-xs mt-2 block">为用户提供完整的数据解决方案</span> */}
                  </p>
                </div>
              </div>

              {/* 全球海洋岗位高质量数据集中心 - 右侧拉长 */}
              <div className={`home-feature-card p-8 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-2 border-green-500/30 backdrop-blur-sm card-lift animate-fade-in-right animation-delay-200 lg:col-span-1 ${activePage === 0 ? "page-card-enter-right page-card-reset-delay" : ""}`}>
                <div className="home-feature-row flex items-start gap-4 mb-4">
                  <img
                    src="./ocean-job-dataset-logo.svg"
                    alt=""
                    className="home-feature-icon h-16 w-16 flex-shrink-0 rounded-full bg-white object-contain p-2 shadow-lg shadow-emerald-900/30"
                  />
                  <div>
                    <h3 className="home-feature-title text-xl font-bold">全球海洋岗位高质量数据集中心</h3>
                    <p className="home-feature-text text-base text-muted-foreground mt-2 leading-relaxed">
                      海洋岗位高质量数据池<br />
开放共享全球研究支撑<br />
多源高质量标准集成库
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="home-stats-grid mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
              {heroStats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`home-stat-card rounded-lg border border-blue-500/20 bg-card/55 px-4 py-3 text-center backdrop-blur-sm card-lift animate-fade-in-up animation-delay-${(index + 3) * 100}`}
                >
                  <div className="home-stat-icon mx-auto mb-2 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600/70 shadow-lg shadow-blue-900/30">
                    <stat.icon className="home-stat-icon-svg h-6 w-6 text-white" />
                  </div>
                  <div className="home-stat-value text-3xl font-bold leading-none text-blue-500">{stat.value}</div>
                  <div className="home-stat-label mt-2 text-sm font-semibold text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="download-barrage" aria-label="实时下载动态">
            {downloadBulletins.map((item, index) => (
              <div
                className="download-barrage-item"
                style={{
                  top: `${(index % 3) * 30}px`,
                  animationDelay: `${index * -2.8}s`,
                  animationDuration: `${24 + (index % 4) * 3}s`,
                }}
                key={item.dataset}
              >
                <span className="download-barrage-time">{item.time}</span>
                <span>{item.user}</span>
                <span>下载了</span>
                <strong>{item.dataset}</strong>
              </div>
            ))}
          </div>
        </section>

        {/* 下层：左中右三列服务区域 */}
        <section className="relative flex h-screen snap-start snap-always items-center overflow-hidden pt-20 pb-4">
          <div className="absolute inset-0 reference-ocean-bg"></div>

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
              <div className="hidden lg:block"></div>

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

        <section className="relative flex h-screen snap-start snap-always items-center overflow-hidden pt-20 pb-6">
          <div className="absolute inset-0 reference-ocean-bg"></div>

          <div className="container mx-auto px-4 relative z-10 flex h-full min-h-0 flex-col gap-4">
            <div className={`text-center animate-fade-in-up ${activePage === 2 ? "page-card-reset-delay" : ""}`}>
              <h2 className="text-3xl font-bold text-white">增值服务区</h2>
            </div>

            <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 md:grid-cols-2">
              {valueAddedServices.map((service, index) => (
                <div
                  key={service.title}
                  className={`value-service-cell grid min-h-0 grid-rows-[auto_auto_minmax(0,1fr)] rounded-xl border bg-gradient-to-br ${service.accentClass} p-4 backdrop-blur-sm card-lift animate-fade-in-up ${
                    activePage === 2 ? "page-card-enter-up page-card-reset-delay" : ""
                  }`}
                  style={{ animationDelay: activePage === 2 ? `${index * 90}ms` : undefined }}
                >
                  <div className="flex items-center gap-3">
                    <service.icon className="h-6 w-6 shrink-0 text-accent" />
                    <h3 className="text-xl font-bold leading-tight text-white">{service.title}</h3>
                  </div>

                  <div className="mt-3 space-y-1 text-base leading-relaxed text-muted-foreground">
                    {service.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        className="block w-fit rounded-sm transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>

                  <div className="mt-4 min-h-0 overflow-hidden rounded-lg border border-border/70 bg-black/20">
                    {service.image ? (
                      <img src={service.image} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full min-h-[150px] items-center justify-center">
                        <div className="flex h-20 w-20 items-center justify-center rounded-xl border border-accent/35 bg-accent/10 text-accent">
                          <service.icon className="h-10 w-10" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
