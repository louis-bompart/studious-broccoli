import { ItemType, BaseReturnDataType, RouterInfo } from "baguette-connector-sdk";

export interface Args {
  id: number;
}
export interface RawData extends BublyData {}
export interface ReturnedData extends BaseReturnDataType, BublyData {}

export interface BublyData {
  flavor: string;
  morality: "good" | "evil" | "neutral";
  order: "lawful" | "chaotic" | "neutral";
  buyUrl: string;
}

export default class Bubly extends ItemType<Args, RawData, ReturnedData> {
  static ItemType: string = "Bubly";
  protected getData(args: Args): Promise<RawData> {
    return Promise.resolve(tEhDaTa[args.id]);
  }
  protected process(
    raw: RawData,
    routerInfo: RouterInfo
  ): Promise<ReturnedData> {
    const data: ReturnedData = {
      ...raw,
      ClickableUri: raw.buyUrl,
      Uri: raw.buyUrl,
      ItemType: Bubly.ItemType,
      Path: routerInfo.Path,
      Title: `Bubly${raw.flavor}`,
    };
    return Promise.resolve(data);
  }
  public async call(args: Args, routerInfo: RouterInfo): Promise<ReturnedData> {
    const rawData = await this.getData(args);
    const processedData = this.process(rawData, routerInfo);
    return processedData;
  }
  public static call(
    args: Args,
    routerInfo: RouterInfo
  ): Promise<ReturnedData> {
    return new Bubly().call(args, routerInfo);
  }
}

const tEhDaTa: BublyData[] = [
  {
    flavor: "lime",
    order: "lawful",
    morality: "good",
    buyUrl:
      "https://www.walmart.ca/en/ip/bubly-lime-sparkling-water-beverage-355ml-cans-12-pack/6000197924483",
  },
];
