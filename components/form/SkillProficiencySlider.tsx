"use client";
import { Slider } from "@/components/ui/slider";

type SliderProps = React.ComponentProps<typeof Slider>;

export default function SkillProficiencySlider(props: SliderProps) {
  return <Slider {...props} />;
}
