type MockStreamResponseOptions = {
  message: string;
  delay?: number;
  random?: boolean;
};

class MockStreamResponse {
  private stream: ReadableStream<Uint8Array>;
  private controller!: ReadableStreamDefaultController<Uint8Array>;
  private options: MockStreamResponseOptions;
  constructor(options: MockStreamResponseOptions) {
    this.options = Object.assign({ delay: 100, random: true }, options);
    this.stream = new ReadableStream({
      start: (controller) => {
        this.controller = controller;
        this.write();
      },
      cancel: () => {
        console.error("Stream canceled");
      },
    });
  }
  private getRandomDelay() {
    if (!this.options.random) return this.options.delay;
    return Math.floor(Math.random() * 10) * this.options.delay;
  }

  private getRandomChinese(): string {
    // 基本汉字的 Unicode 编码范围是 4E00-9FA5
    const start = 0x4e00;
    const end = 0x9fa5;
    const random = Math.floor(start + Math.random() * (end - start + 1));
    return String.fromCharCode(random);
  }

  private write = () => {
    if (this.options.message.length === 0) {
      this.controller.close();
      return;
    }
    const chunk = this.options.message.slice(0, 1);
    this.options.message = this.options.message.slice(1);
    this.controller.enqueue(new TextEncoder().encode(chunk));
    setTimeout(this.write, this.getRandomDelay());
  };
  public start() {
    return new Promise<Response>((resolve) => {
      resolve(new Response(this.stream));
    });
  }
}

const mockStreamResponse = new MockStreamResponse({
  message: "这是一段模拟的流式字符串数据。本次会话传入了10条消息，回复内容为：",
  random: true,
});

let streamString = "";

mockStreamResponse.start().then(async (res) => {
  const reader = res.body.getReader();
  const decoder = new TextDecoder("utf-8");
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    streamString += decoder.decode(value);
    console.log(streamString);
  }
});
