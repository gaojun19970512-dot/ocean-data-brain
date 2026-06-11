import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Database, Star, TrendingUp, Users } from "lucide-react";

/**
 * 海洋岗位高质量数据集详情页
 * 展示数据集产品、质量保证、使用案例
 */

export default function ServiceDatasets() {
  const datasets = [
    {
      id: "sst-dataset",
      name: "全球海表温度数据集",
      version: "v2.0",
      description: "基于多颗卫星融合的高精度海表温度产品",
      coverage: "全球",
      resolution: "0.05°",
      timeRange: "2000-至今",
      updateFrequency: "日更新",
      downloads: 15420,
      rating: 4.8,
      tags: ["温度", "卫星遥感", "全球"],
    },
    {
      id: "current-dataset",
      name: "全球海流速度场数据集",
      version: "v1.5",
      description: "高分辨率全球海流速度和方向产品",
      coverage: "全球",
      resolution: "0.25°",
      timeRange: "2010-至今",
      updateFrequency: "周更新",
      downloads: 8650,
      rating: 4.6,
      tags: ["海流", "动力学", "全球"],
    },
    {
      id: "chlorophyll-dataset",
      name: "海洋叶绿素浓度数据集",
      version: "v3.1",
      description: "基于MODIS/VIIRS的海洋初级生产力产品",
      coverage: "全球",
      resolution: "1km",
      timeRange: "2003-至今",
      updateFrequency: "日更新",
      downloads: 12300,
      rating: 4.7,
      tags: ["生物地球化学", "生产力", "遥感"],
    },
    {
      id: "wave-dataset",
      name: "全球海浪参数数据集",
      version: "v2.2",
      description: "包含波高、周期、方向等多参数海浪产品",
      coverage: "全球",
      resolution: "0.5°",
      timeRange: "1993-至今",
      updateFrequency: "6小时更新",
      downloads: 9870,
      rating: 4.5,
      tags: ["海浪", "动力学", "气候"],
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
              <Database className="w-5 h-5 text-accent" />
              <span className="font-semibold">高质量数据集</span>
            </div>
          </div>
          <Button size="sm" className="bg-primary hover:bg-primary/90">
            浏览所有数据集
          </Button>
        </div>
      </nav>

      {/* 主内容 */}
      <div className="pt-20 pb-8">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-4">海洋岗位高质量数据集</h1>
            <p className="text-lg text-muted-foreground">
              经过严格验证的海洋数据产品，支持科研、业务和应用需求
            </p>
          </div>

          {/* 统计信息 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="p-6 border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">数据集总数</p>
                  <p className="text-3xl font-bold">47</p>
                </div>
                <Database className="w-8 h-8 text-accent opacity-50" />
              </div>
            </Card>

            <Card className="p-6 border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">总下载次数</p>
                  <p className="text-3xl font-bold">186K+</p>
                </div>
                <TrendingUp className="w-8 h-8 text-accent opacity-50" />
              </div>
            </Card>

            <Card className="p-6 border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">活跃用户</p>
                  <p className="text-3xl font-bold">3.2K+</p>
                </div>
                <Users className="w-8 h-8 text-accent opacity-50" />
              </div>
            </Card>
          </div>

          {/* 数据集卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {datasets.map((dataset) => (
              <Card key={dataset.id} className="p-6 border border-border hover:border-accent hover:shadow-lg hover:shadow-accent/20 transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold">{dataset.name}</h3>
                    <p className="text-sm text-muted-foreground">{dataset.version}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-semibold">{dataset.rating}</span>
                  </div>
                </div>

                <p className="text-sm text-foreground mb-4">{dataset.description}</p>

                <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
                  <div>
                    <p className="text-muted-foreground">覆盖范围</p>
                    <p className="font-semibold">{dataset.coverage}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">空间分辨率</p>
                    <p className="font-semibold">{dataset.resolution}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">时间范围</p>
                    <p className="font-semibold">{dataset.timeRange}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">更新频率</p>
                    <p className="font-semibold">{dataset.updateFrequency}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {dataset.tags.map((tag, i) => (
                    <span key={i} className="px-2 py-1 rounded-full text-xs bg-secondary text-foreground">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground">{dataset.downloads.toLocaleString()} 次下载</p>
                  <Button size="sm" className="bg-primary hover:bg-primary/90">
                    了解详情
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* 质量保证信息 */}
          <div className="bg-gradient-to-br from-secondary/20 to-background border border-border rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6">质量保证体系</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent" />
                  数据验证
                </h3>
                <p className="text-sm text-muted-foreground">
                  所有数据集均经过多源对比验证，与国际权威数据源进行交叉检验，确保数据准确性。
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent" />
                  版本管理
                </h3>
                <p className="text-sm text-muted-foreground">
                  完整的版本控制和更新日志，用户可追溯数据演变过程，了解改进内容。
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent" />
                  文档完善
                </h3>
                <p className="text-sm text-muted-foreground">
                  详细的数据说明文档、使用指南和常见问题解答，支持用户快速上手。
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent" />
                  技术支持
                </h3>
                <p className="text-sm text-muted-foreground">
                  专业技术团队提供数据使用咨询、问题诊断和定制化解决方案。
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">开始使用高质量数据集</h3>
            <p className="text-muted-foreground mb-6">
              免费注册账户，立即访问所有数据集
            </p>
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              浏览所有数据集
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
