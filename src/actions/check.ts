import fs from 'fs';

import { workDirectories } from '@/config';
import LoggerTool from '@/logger';

const label = 'check dictionaries';

const logger = new LoggerTool();

logger.setLabel(label);

export const checkDirectories = (): void => {
  logger.info('开始检查工作目录');
  Object.entries(workDirectories).forEach(([key, value]) => {
    if (!fs.existsSync(value)) {
      if (workDirectories.inputPath === value) {
        logger.error('m3u8文件资源目录不存在，请重新配置');
        throw new Error('m3u8文件目录不存在，请重新配置');
      }
      fs.mkdirSync(value);
      logger.info(`目录创建完成：${key}——${value}`);
    } else {
      logger.info(`目录已经存在：${key}——${value}`);
    }
  });
  logger.info('工作目录检查完成');
};

export default checkDirectories;
