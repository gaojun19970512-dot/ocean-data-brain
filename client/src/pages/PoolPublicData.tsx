import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Globe, Database, TrendingUp } from "lucide-react";

/**
 * 国内外公开海洋数据汇聚详情页
 * 展示数据来源、汇聚方式、数据统计
 */

export default function PoolPublicData() {
  const dataSources = [
    {
      id: "china-sources",
      region: "中国数据源",
      sources: [
        { name: "国家海洋信息中心", dataTypes: ["海温", "盐度", "流速"] },
        { name: "中国气象局", dataTypes: ["风场", "降水", "气压"] },
        { name: "自然资源部", dataTypes: ["海岸线", "海底地形", "资源分布"] },
        { name: "中国科学院", dataTypes: ["生物数据", "生态参数", "研究成果"] },
      ],
    },
    {
      id: "international-sources",
      region: "国际数据源",
      sources: [
        { name: "CMEMS (欧洲)", dataTypes: ["海温", "海流", "海浪"] },
        { name: "NOAA (美国)", dataTypes: ["气象", "海洋", "气候"] },
        { name: "JMA (日本)", dataTypes: ["台风", "海浪", "海温"] },
        { name: "ARGO浮标", dataTypes: ["温度", "盐度", "压力"] },
      ],
    },
  ];

  const statistics = [
    { label: "数据源总数", value: "120+", icon: Database },
    { label: "日均更新数据", value: "50GB+", icon: TrendingUp },
    { label: "数据覆盖年限", value: "30+年", icon: Globe },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* 导航栏 */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/" className="p-2 hover:bg-secondary rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </a>
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-accent" />
              <span className="font-semibold">公开数据汇聚</span>
            </div>
          </div>
          <Button size="sm" className="bg-primary hover:bg-primary/90">
            浏览数据源
          </Button>
        </div>
      </nav>

      {/* 主内容 */}
      <div className="pt-20 pb-8">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-4">国内外公开海洋数据汇聚</h1>
            <p className="text-lg text-muted-foreground">
              汇聚全球主要海洋数据源，提供统一的数据访问接口
            </p>
          </div>

          {/* 统计信息 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {statistics.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <Card key={i} className="p-6 border border-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
                      <p className="text-3xl font-bold">{stat.value}</p>
                    </div>
                    <Icon className="w-8 h-8 text-accent opacity-50" />
                  </div>
                </Card>
              );
            })}
          </div>

          {/* 数据源分类 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {dataSources.map((sourceGroup) => (
              <div key={sourceGroup.id} className="bg-gradient-to-br from-secondary/20 to-background border border-border rounded-lg p-8">
                <h2 className="text-2xl font-bold mb-6">{sourceGroup.region}</h2>

                <div className="space-y-4">
                  {sourceGroup.sources.map((source, i) => (
                    <div key={i} className="p-4 rounded-lg bg-card border border-border hover:border-accent transition-colors">
                      <h3 className="font-semibold mb-2">{source.name}</h3>
                      <div className="flex flex-wrap gap-2">
                        {source.dataTypes.map((type, j) => (
                          <span key={j} className="px-2 py-1 rounded text-xs bg-secondary text-foreground">
                            {type}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* 汇聚流程 */}
          <div className="bg-gradient-to-br from-secondary/20 to-background border border-border rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6">数据汇聚流程</h2>

            <div className="space-y-4">
              {[
                { step: 1, title: "数据采集", desc: "从国内外120+个数据源实时采集海洋数据" },
                { step: 2, title: "数据验证", desc: "对采集的数据进行质量检查和异常值处理" },
                { step: 3, title: "数据融合", desc: "对多源数据进行融合和统一处理" },
                { step: 4, title: "数据发布", desc: "通过统一接口发布处理后的数据" },
              ].map((item) => (
                <div key={item.step} className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent text-background flex items-center justify-center font-bold flex-shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 数据质量保证 */}
          <div className="bg-gradient-to-br from-secondary/20 to-background border border-border rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6">数据质量保证</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent" />
                  实时监控
                </h3>
                <p className="text-sm text-muted-foreground">
                  24/7监控数据质量，异常数据自动告警和处理。
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent" />
                  多源对比
                </h3>
                <p className="text-sm text-muted-foreground">
                  与多个权威数据源进行交叉验证，确保数据准确性。
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent" />
                  完整追溯
                </h3>
                <p className="text-sm text-muted-foreground">
                  记录数据来源和处理过程，支持完整的数据溯源。
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent" />
                  定期评估
                </h3>
                <p className="text-sm text-muted-foreground">
                  定期评估数据质量，持续改进数据处理方法。
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">开始使用公开数据</h3>
            <p className="text-muted-foreground mb-6">
              访问120+个数据源，获取最新的海洋数据
            </p>
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              浏览数据源
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
