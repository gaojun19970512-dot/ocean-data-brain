import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, BarChart3, Zap, TrendingUp, Users } from "lucide-react";

/**
 * 海洋岗位高质量数据集中心详情页
 * 展示行业场景、数据聚合、应用案例
 */

export default function PoolScenario() {
  const scenarios = [
    {
      id: "marine-ecology",
      icon: "🐠",
      name: "海洋生态监测",
      description: "海洋生物多样性、生态系统健康评估",
      dataTypes: ["叶绿素浓度", "初级生产力", "海温", "盐度"],
      applications: ["生态评估", "资源管理", "保护规划"],
      users: 234,
    },
    {
      id: "shipping",
      icon: "⛴️",
      name: "海上运输",
      description: "船舶航行安全、路线优化、燃油消耗预测",
      dataTypes: ["海浪", "风场", "洋流", "冰情"],
      applications: ["航线规划", "安全预警", "成本优化"],
      users: 456,
    },
    {
      id: "fishery",
      icon: "🎣",
      name: "渔业管理",
      description: "渔业资源评估、捕捞预测、禁渔区管理",
      dataTypes: ["海温", "叶绿素", "盐度", "溶解氧"],
      applications: ["资源评估", "产量预测", "政策制定"],
      users: 189,
    },
    {
      id: "offshore-energy",
      icon: "⚡",
      name: "海洋能源",
      description: "海上风电、潮汐能、波浪能评估",
      dataTypes: ["风速风向", "海浪参数", "洋流速度", "温度"],
      applications: ["选址评估", "性能预测", "维护规划"],
      users: 312,
    },
    {
      id: "coastal-protection",
      icon: "🏗️",
      name: "海岸防护",
      description: "海岸侵蚀监测、风暴潮预警、防护工程设计",
      dataTypes: ["海浪", "风暴潮", "海平面", "沉积物"],
      applications: ["风险评估", "预警预报", "工程设计"],
      users: 267,
    },
    {
      id: "climate-research",
      icon: "🌍",
      name: "气候研究",
      description: "海洋-大气相互作用、气候变化评估",
      dataTypes: ["海温", "盐度", "流速", "热含量"],
      applications: ["气候模式", "变化评估", "预测预报"],
      users: 423,
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* 导航栏 */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="#/" className="p-2 hover:bg-secondary rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </a>
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-accent" />
              <span className="font-semibold">场景化聚合</span>
            </div>
          </div>
          <Button size="sm" className="bg-primary hover:bg-primary/90">
            浏览所有场景
          </Button>
        </div>
      </nav>

      {/* 主内容 */}
      <div className="pt-20 pb-8">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-4">场景化数据聚合</h1>
            <p className="text-lg text-muted-foreground">
              针对不同行业和应用场景，精心聚合和处理海洋数据
            </p>
          </div>

          {/* 场景卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {scenarios.map((scenario) => (
              <Card key={scenario.id} className="p-6 border border-border hover:border-accent hover:shadow-lg hover:shadow-accent/20 transition-all duration-300 flex flex-col">
                <div className="mb-4">
                  <div className="text-4xl mb-3">{scenario.icon}</div>
                  <h3 className="text-lg font-bold">{scenario.name}</h3>
                  <p className="text-sm text-muted-foreground mt-2">{scenario.description}</p>
                </div>

                <div className="flex-1 space-y-4 mb-4">
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-2">核心数据</p>
                    <div className="flex flex-wrap gap-1">
                      {scenario.dataTypes.map((type, i) => (
                        <span key={i} className="px-2 py-1 rounded text-xs bg-secondary text-foreground">
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-2">应用领域</p>
                    <div className="flex flex-wrap gap-1">
                      {scenario.applications.map((app, i) => (
                        <span key={i} className="px-2 py-1 rounded text-xs bg-primary/20 text-accent">
                          {app}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Users className="w-3 h-3" />
                    <span>{scenario.users} 用户</span>
                  </div>
                  <Button size="sm" variant="outline" className="border-border hover:border-accent">
                    了解详情
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* 特性展示 */}
          <div className="bg-gradient-to-br from-secondary/20 to-background border border-border rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6">场景化聚合的优势</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <Zap className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">即插即用</h3>
                  <p className="text-sm text-muted-foreground">
                    预处理好的数据集，无需复杂的数据清洗和融合工作，直接用于分析。
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <TrendingUp className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">行业优化</h3>
                  <p className="text-sm text-muted-foreground">
                    根据行业需求优化数据选择和处理流程，提高数据的实用性。
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <BarChart3 className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">完整文档</h3>
                  <p className="text-sm text-muted-foreground">
                    提供详细的数据说明、使用案例和最佳实践指南。
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Users className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">社区支持</h3>
                  <p className="text-sm text-muted-foreground">
                    活跃的用户社区，分享经验和最佳实践，获得专业支持。
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <h3 className="text-2xl font-bold mb-4">找到适合您的场景</h3>
            <p className="text-muted-foreground mb-6">
              浏览所有场景，获取针对性的数据解决方案
            </p>
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              浏览所有场景
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
