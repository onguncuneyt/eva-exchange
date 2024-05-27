"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const http_exception_filter_1 = require("./core/configs/http-exception.filter");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe());
    const httpAdapter = app.get(core_1.HttpAdapterHost);
    app.useGlobalFilters(new http_exception_filter_1.AllExceptionsFilter(httpAdapter));
    const port = 3000;
    await app.listen(port);
    console.log(`Application started on port ${port}.`);
}
bootstrap();
//# sourceMappingURL=main.js.map