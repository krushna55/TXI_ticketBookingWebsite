import { createClient } from "@/lib/supabase/client";

type Screen = { screen_id: number; screen_type: string; brand_logo: string };
type BrandScreens = Record<string, Screen[]>;
type brands = {name:string}[];
export const fetchBrandScreens = async (): Promise<BrandScreens> => {
  const supabase = createClient();
  const { data: filterData, error } = await supabase.rpc("get_brand_screens");

  if (error) throw new Error(error.message);

  return filterData?.reduce((acc, item) => {
    const { brand_name, screen_type, screen_id, brand_logo } = item;

    if (!acc[brand_name]) {
      acc[brand_name] = [];
    }

    const alreadyExists = acc[brand_name].some(
      (element) => element.screen_type === screen_type,
    );

    if (!alreadyExists) {
      acc[brand_name].push({ screen_id, screen_type, brand_logo });
    }
    return acc;
  }, {} as BrandScreens);
};
export const fetchBrands = async (): Promise<brands> => {
  const supabase = createClient();
  const { data, error } = await supabase.from("brands").select("name");
  if (error) throw new Error(error.message);
  return data ;
};
