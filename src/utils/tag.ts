import { TagWithCount } from "@/types/tag";

import JavascriptIcon from "@/assets/javascript-tag.svg";
import BitcoinIcon from "@/assets/bitcoin-tag.svg";
import DesignIcon from "@/assets/design-tag.svg";
import InnovationIcon from "@/assets/innovation-tag.svg";
import TutorialIcon from "@/assets/tutorial-tag.svg";
import BusienessIcon from "@/assets/busieness-tag.svg";
import TagIcon from "@/assets/tag.svg";

const tagThemes: { [key: string]: { color: string; icon: string } } = {
  javascript: {
    color: "#5A4F43",
    icon: JavascriptIcon,
  },
  bitcoin: {
    color: "#473E3B",
    icon: BitcoinIcon,
  },
  design: {
    color: "#444F5F",
    icon: DesignIcon,
  },
  innovation: {
    color: "#574D42",
    icon: InnovationIcon,
  },
  tutorial: {
    color: "#335248",
    icon: TutorialIcon,
  },
  business: {
    color: "#46475B",
    icon: BusienessIcon,
  },
} as const;

export const getTagTheme = (tag: TagWithCount) => {
  if (tagThemes[tag.tagName]) {
    return tagThemes[tag.tagName];
  }

  return {
    color: undefined,
    icon: TagIcon,
  };
};
