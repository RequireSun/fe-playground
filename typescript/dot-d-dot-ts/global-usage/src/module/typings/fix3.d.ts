// import 了, 所以退化成了普通 .ts 文件
import { SpecificObj2 } from './fix2';

declare interface Console {
    plainSpecificObj2x(obj: SpecificObj2): void;
}
