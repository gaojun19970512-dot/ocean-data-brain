import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Check, ChevronRight, Code2, Database, Globe, Zap } from "lucide-react";
import { useState } from "react";

/**
 * 海洋 API Hub 详情页
 * 展示API接口列表、调用示例、代码演示
 * 设计理念：保持深海科技极简主义风格
 */

interface APIEndpoint {
  id: string;
  name: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  description: string;
  parameters: Array<{
    name: string;
    type: string;
    required: boolean;
    description: string;
  }>;
  response: {
    status: number;
    example: string;
  };
  examples: {
    curl: string;
    python: string;
    javascript: string;
  };
}

const apiEndpoints: APIEndpoint[] = [
  {
    id: "ocean-data-search",
    name: "海洋数据搜索",
    method: "GET",
    path: "/api/v1/ocean-data/search",
    description: "搜索海洋数据集，支持按地区、时间、数据类型等条件过滤",
    parameters: [
      {
        name: "region",
        type: "string",
        required: false,
        description: "地理区域（如：东海、南海、黄海）",
      },
      {
        name: "start_date",
        type: "string",
        required: false,
        description: "开始日期（格式：YYYY-MM-DD）",
      },
      {
        name: "end_date",
        type: "string",
        required: false,
        description: "结束日期（格式：YYYY-MM-DD）",
      },
      {
        name: "data_type",
        type: "string",
        required: false,
        description: "数据类型（temperature, salinity, current, etc.）",
      },
      {
        name: "limit",
        type: "integer",
        required: false,
        description: "返回结果数量限制（默认：20，最大：100）",
      },
    ],
    response: {
      status: 200,
      example: `{\n  "code": 200,\n  "message": "Success",\n  "data": {\n    "total": 1250,\n    "items": [\n      {\n        "id": "OD-2024-001",\n        "name": "东海表层温度数据",\n        "region": "东海",\n        "date": "2024-05-25",\n        "data_type": "temperature",\n        "coverage": "100%",\n        "download_url": "https://api.ocean-brain.com/download/OD-2024-001"\n      }\n    ]\n  }\n}`,
    },
    examples: {
      curl: `curl -X GET "https://api.ocean-brain.com/api/v1/ocean-data/search?region=东海&data_type=temperature&limit=10" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`,
      python: `import requests\n\nheaders = {\n    "Authorization": "Bearer YOUR_API_KEY",\n    "Content-Type": "application/json"\n}\n\nparams = {\n    "region": "东海",\n    "data_type": "temperature",\n    "limit": 10\n}\n\nresponse = requests.get(\n    "https://api.ocean-brain.com/api/v1/ocean-data/search",\n    headers=headers,\n    params=params\n)\n\ndata = response.json()\nprint(data)`,
      javascript: `const apiKey = 'YOUR_API_KEY';\nconst params = new URLSearchParams({\n  region: '东海',\n  data_type: 'temperature',\n  limit: 10\n});\n\nfetch(\`https://api.ocean-brain.com/api/v1/ocean-data/search?\${params}\`, {\n  method: 'GET',\n  headers: {\n    'Authorization': \`Bearer \${apiKey}\`,\n    'Content-Type': 'application/json'\n  }\n})\n.then(response => response.json())\n.then(data => console.log(data))\n.catch(error => console.error('Error:', error));`,
    },
  },
  {
    id: "ocean-data-download",
    name: "数据下载",
    method: "POST",
    path: "/api/v1/ocean-data/download",
    description: "下载指定的海洋数据集，支持多种格式（CSV、NetCDF、HDF5）",
    parameters: [
      {
        name: "dataset_id",
        type: "string",
        required: true,
        description: "数据集ID",
      },
      {
        name: "format",
        type: "string",
        required: false,
        description: "下载格式（csv, netcdf, hdf5）",
      },
      {
        name: "compression",
        type: "string",
        required: false,
        description: "压缩格式（zip, gzip, none）",
      },
    ],
    response: {
      status: 200,
      example: `{\n  "code": 200,\n  "message": "Download initiated",\n  "data": {\n    "download_id": "DL-2024-0001",\n    "status": "processing",\n    "estimated_time": 120,\n    "download_url": "https://cdn.ocean-brain.com/downloads/DL-2024-0001.zip",\n    "expires_at": "2024-06-25T12:00:00Z"\n  }\n}`,
    },
    examples: {
      curl: `curl -X POST "https://api.ocean-brain.com/api/v1/ocean-data/download" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{\n    "dataset_id": "OD-2024-001",\n    "format": "csv",\n    "compression": "zip"\n  }'`,
      python: `import requests\n\nheaders = {\n    "Authorization": "Bearer YOUR_API_KEY",\n    "Content-Type": "application/json"\n}\n\npayload = {\n    "dataset_id": "OD-2024-001",\n    "format": "csv",\n    "compression": "zip"\n}\n\nresponse = requests.post(\n    "https://api.ocean-brain.com/api/v1/ocean-data/download",\n    headers=headers,\n    json=payload\n)\n\ndata = response.json()\nprint(f"Download ID: {data['data']['download_id']}")`,
      javascript: `const apiKey = 'YOUR_API_KEY';\n\nconst payload = {\n  dataset_id: 'OD-2024-001',\n  format: 'csv',\n  compression: 'zip'\n};\n\nfetch('https://api.ocean-brain.com/api/v1/ocean-data/download', {\n  method: 'POST',\n  headers: {\n    'Authorization': \`Bearer \${apiKey}\`,\n    'Content-Type': 'application/json'\n  },\n  body: JSON.stringify(payload)\n})\n.then(response => response.json())\n.then(data => {\n  console.log('Download ID:', data.data.download_id);\n  console.log('Download URL:', data.data.download_url);\n})\n.catch(error => console.error('Error:', error));`,
    },
  },
  {
    id: "real-time-monitoring",
    name: "实时监测数据",
    method: "GET",
    path: "/api/v1/monitoring/real-time",
    description: "获取实时海洋监测数据（温度、盐度、流速等）",
    parameters: [
      {
        name: "station_id",
        type: "string",
        required: true,
        description: "监测站点ID",
      },
      {
        name: "parameters",
        type: "array",
        required: false,
        description: "监测参数（temperature, salinity, current_speed）",
      },
      {
        name: "interval",
        type: "string",
        required: false,
        description: "数据间隔（1h, 6h, 24h）",
      },
    ],
    response: {
      status: 200,
      example: `{\n  "code": 200,\n  "message": "Success",\n  "data": {\n    "station_id": "ST-001",\n    "location": {\n      "latitude": 30.5,\n      "longitude": 122.5,\n      "name": "东海监测站"\n    },\n    "timestamp": "2024-05-25T12:00:00Z",\n    "measurements": {\n      "temperature": 18.5,\n      "salinity": 34.2,\n      "current_speed": 0.35,\n      "current_direction": 120\n    }\n  }\n}`,
    },
    examples: {
      curl: `curl -X GET "https://api.ocean-brain.com/api/v1/monitoring/real-time?station_id=ST-001" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`,
      python: `import requests\n\nheaders = {\n    "Authorization": "Bearer YOUR_API_KEY",\n    "Content-Type": "application/json"\n}\n\nparams = {\n    "station_id": "ST-001",\n    "parameters": ["temperature", "salinity", "current_speed"]\n}\n\nresponse = requests.get(\n    "https://api.ocean-brain.com/api/v1/monitoring/real-time",\n    headers=headers,\n    params=params\n)\n\ndata = response.json()\nmeasurements = data['data']['measurements']\nprint(f"Temperature: {measurements['temperature']}°C")`,
      javascript: `const apiKey = 'YOUR_API_KEY';\n\nfetch('https://api.ocean-brain.com/api/v1/monitoring/real-time?station_id=ST-001', {\n  method: 'GET',\n  headers: {\n    'Authorization': \`Bearer \${apiKey}\`,\n    'Content-Type': 'application/json'\n  }\n})\n.then(response => response.json())\n.then(data => {\n  const measurements = data.data.measurements;\n  console.log('Temperature:', measurements.temperature);\n  console.log('Salinity:', measurements.salinity);\n})\n.catch(error => console.error('Error:', error));`,
    },
  },
  {
    id: "satellite-imagery",
    name: "卫星遥感数据",
    method: "GET",
    path: "/api/v1/satellite/imagery",
    description: "获取海洋卫星遥感影像数据（海表温度、叶绿素浓度等）",
    parameters: [
      {
        name: "region",
        type: "string",
        required: true,
        description: "地理区域边界（WKT格式）",
      },
      {
        name: "date",
        type: "string",
        required: true,
        description: "查询日期（YYYY-MM-DD）",
      },
      {
        name: "sensor",
        type: "string",
        required: false,
        description: "传感器类型（modis, sentinel, landsat）",
      },
    ],
    response: {
      status: 200,
      example: `{\n  "code": 200,\n  "message": "Success",\n  "data": {\n    "date": "2024-05-25",\n    "region": "东海",\n    "imagery": [\n      {\n        "id": "IMG-2024-0001",\n        "sensor": "MODIS",\n        "resolution": "1km",\n        "cloud_coverage": 15,\n        "url": "https://cdn.ocean-brain.com/imagery/IMG-2024-0001.tif",\n        "metadata": {\n          "sst": 18.5,\n          "chlorophyll": 2.3\n        }\n      }\n    ]\n  }\n}`,
    },
    examples: {
      curl: `curl -X GET "https://api.ocean-brain.com/api/v1/satellite/imagery?region=POLYGON((120+30,125+30,125+35,120+35,120+30))&date=2024-05-25" \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
      python: `import requests\n\nheaders = {\n    "Authorization": "Bearer YOUR_API_KEY"\n}\n\nparams = {\n    "region": "POLYGON((120 30,125 30,125 35,120 35,120 30))",\n    "date": "2024-05-25",\n    "sensor": "modis"\n}\n\nresponse = requests.get(\n    "https://api.ocean-brain.com/api/v1/satellite/imagery",\n    headers=headers,\n    params=params\n)\n\ndata = response.json()\nfor img in data['data']['imagery']:\n    print(f"Image: {img['id']}, Cloud: {img['cloud_coverage']}%")`,
      javascript: `const apiKey = 'YOUR_API_KEY';\nconst region = 'POLYGON((120 30,125 30,125 35,120 35,120 30))';\nconst date = '2024-05-25';\n\nconst params = new URLSearchParams({\n  region: region,\n  date: date,\n  sensor: 'modis'\n});\n\nfetch(\`https://api.ocean-brain.com/api/v1/satellite/imagery?\${params}\`, {\n  method: 'GET',\n  headers: {\n    'Authorization': \`Bearer \${apiKey}\`\n  }\n})\n.then(response => response.json())\n.then(data => {\n  data.data.imagery.forEach(img => {\n    console.log(\`Image: \${img.id}, Cloud: \${img.cloud_coverage}%\`);\n  });\n})\n.catch(error => console.error('Error:', error));`,
    },
  },
];

export default function ServicePlatform() {
  const [selectedAPI, setSelectedAPI] = useState<APIEndpoint>(apiEndpoints[0]);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<"curl" | "python" | "javascript">("curl");

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case "GET":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "POST":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "PUT":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "DELETE":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

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
            <a href="/ocean-data-service" className="text-sm hover:text-accent transition-colors">服务平台</a>
            <a href="#" className="text-sm text-accent font-semibold">API Hub</a>
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
              <a href="/ocean-data-service" className="text-sm text-muted-foreground hover:text-accent transition-colors">服务平台</a>
              <span className="text-muted-foreground">/</span>
              <span className="text-sm text-accent">海洋 API Hub</span>
            </div>
            <h1 className="text-5xl font-bold mb-4 flex items-center gap-3">
              <Code2 className="w-10 h-10 text-accent" />
              海洋 API Hub
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              强大的 RESTful API，为您的应用提供实时海洋数据访问。支持多种编程语言和数据格式，毫秒级响应时间。
            </p>
            <div className="flex gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                查看文档 <ChevronRight className="ml-2 w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-border hover:bg-secondary">
                获取API密钥
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* API 列表和详情 */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* API 列表 */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold mb-6">API 接口</h2>
              <div className="space-y-2">
                {apiEndpoints.map((api) => (
                  <button
                    key={api.id}
                    onClick={() => setSelectedAPI(api)}
                    className={`w-full text-left p-4 rounded-lg border transition-all duration-300 ${
                      selectedAPI.id === api.id
                        ? "bg-primary/20 border-accent text-accent"
                        : "bg-card border-border hover:border-accent/50 text-foreground hover:text-accent"
                    }`}
                  >
                    <p className="font-semibold text-sm">{api.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">{api.method}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* API 详情 */}
            <div className="lg:col-span-3 space-y-8">
              {/* API 基本信息 */}
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getMethodColor(selectedAPI.method)}`}>
                      {selectedAPI.method}
                    </span>
                    <code className="text-accent text-sm bg-secondary/50 px-3 py-1 rounded">
                      {selectedAPI.path}
                    </code>
                  </div>
                  <p className="text-foreground">{selectedAPI.description}</p>
                </div>

                {/* 参数表 */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">请求参数</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-4 font-semibold">参数名</th>
                          <th className="text-left py-3 px-4 font-semibold">类型</th>
                          <th className="text-left py-3 px-4 font-semibold">必需</th>
                          <th className="text-left py-3 px-4 font-semibold">描述</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedAPI.parameters.map((param, i) => (
                          <tr key={i} className="border-b border-border/50 hover:bg-secondary/20 transition-colors">
                            <td className="py-3 px-4 font-mono text-accent">{param.name}</td>
                            <td className="py-3 px-4 text-muted-foreground">{param.type}</td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                param.required
                                  ? "bg-red-500/20 text-red-400"
                                  : "bg-green-500/20 text-green-400"
                              }`}>
                                {param.required ? "是" : "否"}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-muted-foreground">{param.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 响应示例 */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">响应示例</h3>
                  <div className="relative">
                    <div className="bg-secondary/30 rounded-lg p-4 border border-border overflow-x-auto">
                      <pre className="text-sm text-muted-foreground font-mono whitespace-pre-wrap break-words">
                        {selectedAPI.response.example}
                      </pre>
                    </div>
                    <button
                      onClick={() => copyToClipboard(selectedAPI.response.example, "response")}
                      className="absolute top-2 right-2 p-2 rounded bg-secondary hover:bg-secondary/80 transition-colors"
                    >
                      {copiedCode === "response" ? (
                        <Check className="w-4 h-4 text-green-400" />
                      ) : (
                        <Copy className="w-4 h-4 text-muted-foreground" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* 代码示例 */}
              <div>
                <h3 className="text-lg font-semibold mb-4">调用示例</h3>
                <Tabs value={selectedLanguage} onValueChange={(v) => setSelectedLanguage(v as any)}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="curl">cURL</TabsTrigger>
                    <TabsTrigger value="python">Python</TabsTrigger>
                    <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                  </TabsList>

                  {(["curl", "python", "javascript"] as const).map((lang) => (
                    <TabsContent key={lang} value={lang} className="mt-4">
                      <div className="relative">
                        <div className="bg-secondary/30 rounded-lg p-4 border border-border overflow-x-auto">
                          <pre className="text-sm text-muted-foreground font-mono whitespace-pre-wrap break-words">
                            {selectedAPI.examples[lang]}
                          </pre>
                        </div>
                        <button
                          onClick={() => copyToClipboard(selectedAPI.examples[lang], lang)}
                          className="absolute top-2 right-2 p-2 rounded bg-secondary hover:bg-secondary/80 transition-colors"
                        >
                          {copiedCode === lang ? (
                            <Check className="w-4 h-4 text-green-400" />
                          ) : (
                            <Copy className="w-4 h-4 text-muted-foreground" />
                          )}
                        </button>
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 特性卡片 */}
      <section className="py-16 bg-gradient-to-b from-background to-secondary/20 border-t border-border">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">API 特性</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Zap,
                title: "高性能",
                description: "毫秒级响应时间，支持高并发请求",
              },
              {
                icon: Database,
                title: "数据完整",
                description: "覆盖全球海域，数据更新频率高",
              },
              {
                icon: Globe,
                title: "全球覆盖",
                description: "支持多地区、多维度的数据查询",
              },
              {
                icon: Code2,
                title: "易于集成",
                description: "RESTful API，支持多种编程语言",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="p-6 rounded-lg bg-card border border-border hover:border-accent hover:shadow-lg hover:shadow-accent/20 transition-all duration-300 group"
              >
                <feature.icon className="w-8 h-8 text-accent mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
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
              查看完整文档
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
