import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Download, Globe, Database } from "lucide-react";

/**
 * 国际海洋公共数据下载详情页
 * 展示国际数据源、下载方式、数据说明
 */

export default function ServiceDownload() {
  const dataSources = [
    {
      id: "cmems",
      name: "CMEMS",
      fullName: "Copernicus Marine Service",
      description: "欧洲哥白尼海洋服务，提供全球海洋物理、生物地球化学数据",
      dataTypes: ["海表温度", "海面高度", "海流", "盐度", "叶绿素浓度"],
      coverage: "全球",
      updateFrequency: "日更新",
      link: "https://marine.copernicus.eu",
    },
    {
      id: "noaa",
      name: "NOAA",
      fullName: "National Oceanic and Atmospheric Administration",
      description: "美国国家海洋和大气管理局，提供全球海洋气象数据",
      dataTypes: ["海表温度", "风场", "降水", "气压", "海浪"],
      coverage: "全球",
      updateFrequency: "实时更新",
      link: "https://www.noaa.gov",
    },
    {
      id: "jma",
      name: "JMA",
      fullName: "Japan Meteorological Agency",
      description: "日本气象厅，提供西太平洋海洋气象数据",
      dataTypes: ["海表温度", "风场", "波浪", "台风路径"],
      coverage: "西太平洋",
      updateFrequency: "6小时更新",
      link: "https://www.jma.go.jp",
    },
    {
      id: "bom",
      name: "BOM",
      fullName: "Bureau of Meteorology",
      description: "澳大利亚气象局，提供印度洋-太平洋海洋数据",
      dataTypes: ["海表温度", "风场", "海流", "海浪"],
      coverage: "印度洋-太平洋",
      updateFrequency: "日更新",
      link: "https://www.bom.gov.au",
    },
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
              <Download className="w-5 h-5 text-accent" />
              <span className="font-semibold">国际海洋公共数据下载</span>
            </div>
          </div>
          <Button size="sm" className="bg-primary hover:bg-primary/90">
            开始下载
          </Button>
        </div>
      </nav>

      {/* 主内容 */}
      <div className="pt-20 pb-8">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-4">国际海洋公共数据下载</h1>
            <p className="text-lg text-muted-foreground">
              聚合全球主要海洋数据源，支持多格式下载和批量处理
            </p>
          </div>

          {/* 数据源卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {dataSources.map((source) => (
              <Card key={source.id} className="p-6 border border-border hover:border-accent hover:shadow-lg hover:shadow-accent/20 transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold">{source.name}</h3>
                    <p className="text-sm text-muted-foreground">{source.fullName}</p>
                  </div>
                  <Globe className="w-6 h-6 text-accent flex-shrink-0" />
                </div>

                <p className="text-sm text-foreground mb-4">{source.description}</p>

                <div className="space-y-3 mb-4">
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-2">数据类型</p>
                    <div className="flex flex-wrap gap-2">
                      {source.dataTypes.map((type, i) => (
                        <span key={i} className="px-2 py-1 rounded-full text-xs bg-secondary text-foreground">
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <p className="text-muted-foreground">覆盖范围</p>
                      <p className="font-semibold">{source.coverage}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">更新频率</p>
                      <p className="font-semibold">{source.updateFrequency}</p>
                    </div>
                  </div>
                </div>

                <a href={source.link} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="w-full border-border hover:border-accent">
                    访问官网
                  </Button>
                </a>
              </Card>
            ))}
          </div>

          {/* 下载说明 */}
          <div className="bg-gradient-to-br from-secondary/20 to-background border border-border rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6">下载指南</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-accent text-background flex items-center justify-center text-sm font-bold">1</span>
                  选择数据源
                </h3>
                <p className="text-muted-foreground">
                  根据您的需求选择合适的国际数据源。每个数据源提供不同的地理覆盖范围和数据类型。
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-accent text-background flex items-center justify-center text-sm font-bold">2</span>
                  配置下载参数
                </h3>
                <p className="text-muted-foreground">
                  指定时间范围、地理区域、数据类型和输出格式（NetCDF、HDF5、CSV等）。
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-accent text-background flex items-center justify-center text-sm font-bold">3</span>
                  提交下载任务
                </h3>
                <p className="text-muted-foreground">
                  系统会自动从国际数据源获取数据，支持大文件断点续传和并行下载。
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-accent text-background flex items-center justify-center text-sm font-bold">4</span>
                  获取数据文件
                </h3>
                <p className="text-muted-foreground">
                  下载完成后，您可以直接获取数据文件或通过API访问。支持数据格式转换和预处理。
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <h3 className="text-2xl font-bold mb-4">准备好开始了吗？</h3>
            <p className="text-muted-foreground mb-6">
              获取免费的下载配额，开始访问全球海洋数据
            </p>
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              开始下载 <Download className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
