import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Zap, Download, Database } from "lucide-react";

/**
 * 海洋数据服务平台主页面
 * 展示三个核心服务：API Hub、国际下载助手、高质量数据集
 */

export default function OceanDataService() {
  const services = [
    {
      id: "api-hub",
      icon: Zap,
      title: "海洋 API Hub",
      description: "强大的 RESTful API，为您的应用提供实时海洋数据访问。支持多种编程语言和数据格式。",
      features: [
        "实时数据查询",
        "多语言代码示例",
        "高性能响应",
        "完整文档支持",
      ],
      link: "/ocean-data-service/api-hub",
      color: "from-blue-500/20 to-cyan-500/20",
    },
    {
      id: "download-assistant",
      icon: Download,
      title: "国际下载助手",
      description: "一键下载全球海洋数据，支持多种格式和压缩方式，快速获取您需要的数据。",
      features: [
        "全球数据覆盖",
        "多格式支持",
        "批量下载",
        "断点续传",
      ],
      link: "/ocean-data-service/download",
      color: "from-green-500/20 to-emerald-500/20",
    },
    {
      id: "data-aggregation",
      icon: Database,
      title: "高质量数据集",
      description: "经过严格验证的海洋数据集，确保数据准确性和可靠性。支持多维度数据查询和分析。",
      features: [
        "数据验证",
        "多维度分析",
        "实时更新",
        "完整元数据",
      ],
      link: "/ocean-data-service/datasets",
      color: "from-purple-500/20 to-pink-500/20",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* 导航栏 */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-primary flex items-center justify-center">
              <span className="text-background font-bold text-sm">海</span>
            </div>
            <span className="font-bold text-lg">观海数据大脑</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="/" className="text-sm hover:text-accent transition-colors">首页</a>
            <a href="#" className="text-sm text-accent font-semibold">服务平台</a>
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              获取API密钥
            </Button>
          </div>
        </div>
      </nav>

      {/* 页面头部 */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-secondary/20 to-background border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <a href="/" className="text-sm text-muted-foreground hover:text-accent transition-colors">首页</a>
              <span className="text-muted-foreground">/</span>
              <span className="text-sm text-accent">海洋数据服务平台</span>
            </div>
            <h1 className="text-5xl font-bold mb-4">
              海洋数据服务平台
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              一站式海洋数据服务，提供 API 接口、数据下载、数据集管理等完整解决方案。
            </p>
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              开始探索 <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* 服务卡片 */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <a key={service.id} href={service.link}>
                <Card className="h-full p-8 bg-card border border-border hover:border-accent hover:shadow-lg hover:shadow-accent/20 transition-all duration-300 group cursor-pointer">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <service.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground mb-6">{service.description}</p>
                  <div className="space-y-2 mb-8">
                    {service.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-accent font-semibold group-hover:gap-3 transition-all">
                    了解更多
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Card>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 特性展示 */}
      <section className="py-20 bg-gradient-to-b from-background to-secondary/20 border-t border-border">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">为什么选择我们</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "数据完整",
                description: "覆盖全球海域，数据维度丰富",
              },
              {
                title: "实时更新",
                description: "每日更新最新的海洋监测数据",
              },
              {
                title: "高可用性",
                description: "99.9% 的服务可用性保证",
              },
              {
                title: "安全可靠",
                description: "企业级数据安全和隐私保护",
              },
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-lg bg-card border border-border hover:border-accent/50 transition-colors">
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA 区域 */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-accent/10 border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">准备好开始了吗？</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            获取免费的 API 密钥，开始构建您的海洋数据应用
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              获取 API 密钥
            </Button>
            <Button size="lg" variant="outline" className="border-border hover:bg-secondary">
              查看文档
            </Button>
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 观海数据大脑. 保留所有权利。</p>
        </div>
      </footer>
    </div>
  );
}
