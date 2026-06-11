import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Check, ArrowLeft, Zap } from "lucide-react";
import { useState } from "react";

/**
 * 海洋数据服务接口详情页
 * 展示API接口列表、调用示例、代码演示
 */

interface APIEndpoint {
  id: string;
  name: string;
  method: "GET" | "POST";
  path: string;
  description: string;
  parameters: Array<{
    name: string;
    type: string;
    required: boolean;
    description: string;
  }>;
  examples: {
    curl: string;
    python: string;
    javascript: string;
  };
}

const apiEndpoints: APIEndpoint[] = [
  {
    id: "ocean-environment",
    name: "海洋环境数据查询",
    method: "GET",
    path: "/api/v1/ocean-environment",
    description: "查询海洋环境参数（温度、盐度、流速等）",
    parameters: [
      { name: "region", type: "string", required: true, description: "地理区域" },
      { name: "start_date", type: "string", required: false, description: "开始日期" },
      { name: "end_date", type: "string", required: false, description: "结束日期" },
    ],
    examples: {
      curl: `curl -X GET "https://api.ocean-brain.com/api/v1/ocean-environment?region=东海" \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
      python: `import requests\nresponse = requests.get(\n  "https://api.ocean-brain.com/api/v1/ocean-environment?region=东海",\n  headers={"Authorization": "Bearer YOUR_API_KEY"}\n)\nprint(response.json())`,
      javascript: `fetch('https://api.ocean-brain.com/api/v1/ocean-environment?region=东海', {\n  headers: {'Authorization': 'Bearer YOUR_API_KEY'}\n})\n.then(r => r.json())\n.then(data => console.log(data))`,
    },
  },
  {
    id: "ship-dynamics",
    name: "船舶动态数据",
    method: "GET",
    path: "/api/v1/ship-dynamics",
    description: "获取实时船舶位置、速度、航向等动态信息",
    parameters: [
      { name: "mmsi", type: "string", required: false, description: "船舶MMSI号" },
      { name: "region", type: "string", required: false, description: "地理区域" },
      { name: "limit", type: "integer", required: false, description: "返回条数" },
    ],
    examples: {
      curl: `curl -X GET "https://api.ocean-brain.com/api/v1/ship-dynamics?region=东海&limit=10" \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
      python: `import requests\nresponse = requests.get(\n  "https://api.ocean-brain.com/api/v1/ship-dynamics",\n  params={"region": "东海", "limit": 10},\n  headers={"Authorization": "Bearer YOUR_API_KEY"}\n)\nprint(response.json())`,
      javascript: `const params = new URLSearchParams({region: '东海', limit: 10});\nfetch(\`https://api.ocean-brain.com/api/v1/ship-dynamics?\${params}\`, {\n  headers: {'Authorization': 'Bearer YOUR_API_KEY'}\n})\n.then(r => r.json())\n.then(data => console.log(data))`,
    },
  },
];

export default function ServiceAPIHub() {
  const [selectedAPI, setSelectedAPI] = useState<APIEndpoint>(apiEndpoints[0]);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<"curl" | "python" | "javascript">("curl");

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
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
              <Zap className="w-5 h-5 text-accent" />
              <span className="font-semibold">海洋数据服务接口</span>
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
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-4">海洋数据服务接口</h1>
            <p className="text-lg text-muted-foreground">
              支持海洋环境、船舶动态等多维度数据查询和实时监测
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
                    className={`w-full text-left p-3 rounded-lg border transition-all ${
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
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full text-sm font-semibold bg-blue-500/20 text-blue-400 border border-blue-500/30">
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
