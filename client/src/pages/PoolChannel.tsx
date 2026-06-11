import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Network, Shield, Zap, Users } from "lucide-react";

/**
 * 海洋可信数据空间渠道汇聚详情页
 * 展示多渠道数据融合、信任机制、支撑能力
 */

export default function PoolChannel() {
  const channels = [
    {
      id: "government",
      icon: "🏛️",
      name: "政府数据渠道",
      description: "国家海洋部门、气象部门等官方数据",
      features: ["权威性强", "更新及时", "覆盖全面"],
      dataVolume: "50TB+",
    },
    {
      id: "research",
      icon: "🔬",
      name: "科研机构渠道",
      description: "高校、科研院所的海洋研究数据",
      features: ["学术严谨", "质量高", "创新性强"],
      dataVolume: "30TB+",
    },
    {
      id: "commercial",
      icon: "🏢",
      name: "商业数据渠道",
      description: "卫星遥感、传感器网络等商业数据",
      features: ["实时性好", "分辨率高", "覆盖广"],
      dataVolume: "100TB+",
    },
    {
      id: "international",
      icon: "🌐",
      name: "国际合作渠道",
      description: "国际组织、友邦国家的共享数据",
      features: ["全球视野", "多源融合", "开放共享"],
      dataVolume: "200TB+",
    },
  ];

  const trustMechanisms = [
    {
      title: "跨域数据互认与互联",
      description: "建立统一的数据标准和互认机制，实现不同渠道数据的无缝融合",
    },
    {
      title: "数据分级分类管理",
      description: "根据数据敏感性和重要性进行分级，实施差异化管理策略",
    },
    {
      title: "数据权属记录与溯权",
      description: "完整记录数据来源和权属关系，支持数据溯源和权益保护",
    },
    {
      title: "安全与隐私保护框架",
      description: "采用先进的加密、访问控制等技术，保护敏感数据安全",
    },
    {
      title: "用途控制与合规监管",
      description: "对数据使用进行精细化控制，确保合规使用",
    },
    {
      title: "可信交换与互操作机制",
      description: "建立可信的数据交换协议，支持安全的数据共享",
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
              <Network className="w-5 h-5 text-accent" />
              <span className="font-semibold">渠道汇聚支撑</span>
            </div>
          </div>
          <Button size="sm" className="bg-primary hover:bg-primary/90">
            了解更多
          </Button>
        </div>
      </nav>

      {/* 主内容 */}
      <div className="pt-20 pb-8">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-4">海洋可信数据空间渠道汇聚</h1>
            <p className="text-lg text-muted-foreground">
              多渠道数据融合支撑，建立海洋数据的信任生态
            </p>
          </div>

          {/* 数据渠道 */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">数据渠道</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {channels.map((channel) => (
                <Card key={channel.id} className="p-6 border border-border hover:border-accent hover:shadow-lg hover:shadow-accent/20 transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="text-4xl mb-2">{channel.icon}</div>
                      <h3 className="text-lg font-bold">{channel.name}</h3>
                      <p className="text-sm text-muted-foreground mt-2">{channel.description}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs font-semibold text-muted-foreground mb-2">特点</p>
                    <div className="flex flex-wrap gap-2">
                      {channel.features.map((feature, i) => (
                        <span key={i} className="px-2 py-1 rounded text-xs bg-secondary text-foreground">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <p className="text-sm text-muted-foreground">数据规模</p>
                    <p className="text-lg font-bold text-accent">{channel.dataVolume}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* 信任机制 */}
          <div className="bg-gradient-to-br from-secondary/20 to-background border border-border rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Shield className="w-6 h-6 text-accent" />
              国家海洋可信数据空间
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {trustMechanisms.map((mechanism, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-accent text-background flex items-center justify-center font-bold flex-shrink-0 text-sm">
                    ✓
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{mechanism.title}</h3>
                    <p className="text-sm text-muted-foreground">{mechanism.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 中国移动支撑能力 */}
          <div className="bg-gradient-to-br from-secondary/20 to-background border border-border rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Zap className="w-6 h-6 text-accent" />
              中国移动基础设施支撑
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "信息大数据平台", desc: "支持海量数据存储和处理" },
                { title: "移动云计算与存储", desc: "弹性计算资源和存储服务" },
                { title: "5G/5G-A海洋通信网络", desc: "高速、低延迟的海洋通信" },
                { title: "国际海洋数据下载专网", desc: "专网支撑国际数据传输" },
                { title: "安全与合规保障体系", desc: "全面的安全防护和合规管理" },
                { title: "算力网络智能调度", desc: "智能化的计算资源调度" },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary text-background flex items-center justify-center font-bold flex-shrink-0 text-sm">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 合作伙伴 */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">合作伙伴</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                "国家海洋信息中心",
                "中国气象局",
                "自然资源部",
                "中国科学院",
                "欧洲CMEMS",
                "美国NOAA",
                "日本JMA",
                "国际海洋组织",
              ].map((partner, i) => (
                <Card key={i} className="p-4 border border-border text-center hover:border-accent transition-colors">
                  <p className="text-sm font-semibold">{partner}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">加入海洋数据生态</h3>
            <p className="text-muted-foreground mb-6">
              成为合作伙伴，共同构建开放、可信的海洋数据空间
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                了解合作机制
              </Button>
              <Button size="lg" variant="outline" className="border-border hover:border-accent">
                联系我们
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
