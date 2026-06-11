import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Check, ChevronRight, Code2, Database, Globe, Zap, ArrowLeft } from "lucide-react";
import { useState } from "react";

/**
 * 海洋 API Hub 详情页
 * 展示API接口列表、调用示例、代码演示
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
      example: `{\n  "code": 200,\n  "message": "Success",\n  "data": {\n    "total": 1250,\n    "items": [\n      {\n        "id": "OD-2024-001",\n        "name": "东海表层温度数据",\n        "region": "东海",\n        "date": "2024-05-25",\n        "data_type": "temperature",\n        "coverage": "100%"\n      }\n    ]\n  }\n}`,
    },
    examples: {
      curl: `curl -X GET "https://api.ocean-brain.com/api/v1/ocean-data/search?region=东海&data_type=temperature" \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
      python: `import requests\nheaders = {"Authorization": "Bearer YOUR_API_KEY"}\nparams = {"region": "东海", "data_type": "temperature"}\nresponse = requests.get("https://api.ocean-brain.com/api/v1/ocean-data/search", headers=headers, params=params)\nprint(response.json())`,
      javascript: `fetch('https://api.ocean-brain.com/api/v1/ocean-data/search?region=东海', {\n  headers: {'Authorization': 'Bearer YOUR_API_KEY'}\n})\n.then(r => r.json())\n.then(data => console.log(data))`,
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
    ],
    response: {
      status: 200,
      example: `{\n  "code": 200,\n  "data": {\n    "station_id": "ST-001",\n    "timestamp": "2024-05-25T12:00:00Z",\n    "measurements": {\n      "temperature": 18.5,\n      "salinity": 34.2,\n      "current_speed": 0.35\n    }\n  }\n}`,
    },
    examples: {
      curl: `curl -X GET "https://api.ocean-brain.com/api/v1/monitoring/real-time?station_id=ST-001" \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
      python: `import requests\nresponse = requests.get(\n  "https://api.ocean-brain.com/api/v1/monitoring/real-time?station_id=ST-001",\n  headers={"Authorization": "Bearer YOUR_API_KEY"}\n)\nprint(response.json())`,
      javascript: `fetch('https://api.ocean-brain.com/api/v1/monitoring/real-time?station_id=ST-001', {\n  headers: {'Authorization': 'Bearer YOUR_API_KEY'}\n})\n.then(r => r.json())\n.then(data => console.log(data))`,
    },
  },
];

export default function APIHub() {
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
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

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
              <Code2 className="w-5 h-5 text-accent" />
              <span className="font-semibold">海洋 API Hub</span>
            </div>
          </div>
          <Button size="sm" className="bg-primary hover:bg-primary/90">
            获取API密钥
          </Button>
        </div>
      </nav>

      {/* 主内容 */}
      <div className="pt-20 pb-8">
        <div className="container mx-auto px-4">
          {/* 页面标题 */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-4">海洋 API Hub</h1>
            <p className="text-lg text-muted-foreground">
              强大的 RESTful API，为您的应用提供实时海洋数据访问
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* API 列表 */}
            <div className="lg:col-span-1">
              <h2 className="text-lg font-bold mb-4">API 接口</h2>
              <div className="space-y-2">
                {apiEndpoints.map((api) => (
                  <button
                    key={api.id}
                    onClick={() => setSelectedAPI(api)}
                    className={`w-full text-left p-3 rounded-lg border transition-all duration-300 ${
                      selectedAPI.id === api.id
                        ? "bg-primary/20 border-accent text-accent"
                        : "bg-card border-border hover:border-accent/50"
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
              {/* 基本信息 */}
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
                        <tr key={i} className="border-b border-border/50 hover:bg-secondary/20">
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
      </div>
    </div>
  );
}
