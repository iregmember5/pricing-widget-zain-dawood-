import React from "react";
import { useState } from "react";

// ==================== TYPES ====================
type EditorType =
  | "pricing-grid"
  | "pricing-columns"
  | "comparison-table"
  | "service-plans"
  | null;


// ADD THIS NEW TYPE
interface AppearanceSettings {
  primaryColor: string;
  secondaryColor: string;
  font: string;
  fontWeight: "400" | "700";
  fontSize: number;
  buttonShape: "rounded" | "pill" | "sharp";
  buttonRadius: number; // ADD THIS LINE
  buttonType: "filled" | "outline" | "gradient";
  columnStyle: "default" | "style1" | "style2" | "style3" | "custom";
}

interface BaseCardData {
  title: string;
  description: string;
  buttonText: string;
}

interface PricingCardData extends BaseCardData {
  type: "pricing-grid" | "pricing-columns";
  multiTableMode?: boolean;
  tables?: Array<{
    id: string;
    name: string;
    caption?: string;
    showWidgetTitle?: boolean;
    widgetTitle?: string;
    widgetTitleCaption?: string;
    widgetTitleColor?: string;
    widgetCaptionColor?: string;
    cards: Array<{
      title: string;
      titleCaption?: string;
      price: string;
      period: string;
      priceCaption?: string;
      description: string;
      features: Array<{
        text: string;
        hint?: string;
      }>;
      buttonText: string;
      buttonCaption?: string;
      buttonLink?: string;
      buttonLinkTarget?: "_self" | "_blank";
      imageUrl?: string;
      oldPriceEnabled?: boolean;
      oldPrice?: string;
      discountLabel?: string;
      priceColor?: string;
      discountLabelColor?: string;
      discountLabelTextColor?: string;
    }>;
  }>;
  widgetTitle?: string;
  widgetTitleCaption?: string;
  showWidgetTitle?: boolean;
  widgetTitleColor?: string;
  widgetCaptionColor?: string;
  cards: {
    title: string;
    titleCaption?: string;
    price: string;
    period: string;
    priceCaption?: string;
    description: string;
    features: Array<{
      text: string;
      hint?: string;
    }>;
    buttonText: string;
    buttonCaption?: string;
    buttonLink?: string;
    buttonLinkTarget?: "_self" | "_blank";
    imageUrl?: string;
    oldPriceEnabled?: boolean;
    oldPrice?: string;
    discountLabel?: string;
    priceColor?: string;
    discountLabelColor?: string;
    discountLabelTextColor?: string;
  }[];
}
interface ComparisonTableData {
  type: "comparison-table";
  title: string;
  plans: {
    name: string;
    price: string;
    period: string;
    imageUrl?: string;
    buttonText: string;
    features: Record<string, string | boolean>;
  }[];
  categories: {
    name: string;
    features: {
      name: string;
      type: "text" | "boolean";
    }[];
  }[];
}

type EditorData = PricingCardData | ComparisonTableData;

// ==================== CONSTANTS ====================
const INITIAL_PRICING_CARD: PricingCardData = {
  type: "pricing-columns",
  multiTableMode: false,
  tables: [
    {
      id: "table_1",
      name: "Table 1",
      caption: "",
      showWidgetTitle: false,
      widgetTitle: "",
      widgetTitleCaption: "",
      widgetTitleColor: "#FF6B6B",
      widgetCaptionColor: "#6B7280",
      cards: [
        {
          title: "Standard Room",
          titleCaption: "",
          price: "$99",
          period: "/night",
          priceCaption: "",
          description: "1 full bed",
          imageUrl: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=500&fit=crop",
          features: [
            { text: "Private Bathroom", hint: "" },
            { text: "Mini Refrigerator", hint: "" },
            { text: "Flat-screen TV", hint: "" },
            { text: "In-Room Heating and A/C Controls", hint: "" },
            { text: "High Speed Free WiFi", hint: "" },
          ],
          buttonText: "Book now",
          buttonCaption: "",
          buttonLink: "",
          buttonLinkTarget: "_self",
        },
        {
          title: "Double Room",
          titleCaption: "",
          price: "$139",
          period: "/night",
          priceCaption: "",
          description: "2 full beds",
          imageUrl: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=500&fit=crop",
          features: [
            { text: "Private Bathroom", hint: "" },
            { text: "Mini Refrigerator", hint: "" },
            { text: "Flat-screen TV", hint: "" },
            { text: "In-Room Heating and A/C Controls", hint: "" },
            { text: "High Speed Free WiFi", hint: "" },
          ],
          buttonText: "Book now",
          buttonCaption: "",
          buttonLink: "",
          buttonLinkTarget: "_self",
        },
        {
          title: "King Room",
          titleCaption: "",
          price: "$159",
          period: "/night",
          priceCaption: "",
          description: "1 king bed",
          imageUrl: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=500&fit=crop",
          features: [
            { text: "Private Bathroom", hint: "" },
            { text: "Mini Refrigerator", hint: "" },
            { text: "Flat-screen TV", hint: "" },
            { text: "In-Room Heating and A/C Controls", hint: "" },
            { text: "High Speed Free WiFi", hint: "" },
          ],
          buttonText: "Book now",
          buttonCaption: "",
          buttonLink: "",
          buttonLinkTarget: "_self",
        },
      ],
    },
  ],
  widgetTitle: "",
  widgetTitleCaption: "",
  showWidgetTitle: false,
  widgetTitleColor: "#FF6B6B",        // ADD THIS - Default coral/salmon color
  widgetCaptionColor: "#6B7280",      // ADD THIS - Default gray
  cards: [  // ADD ALL 3 CARDS HERE TOO for single-table mode
    {
      title: "Standard Room",
      titleCaption: "",
      price: "$99",
      period: "/night",
      priceCaption: "",
      description: "1 full bed",
      imageUrl: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=500&fit=crop",
      features: [
        { text: "Private Bathroom", hint: "" },
        { text: "Mini Refrigerator", hint: "" },
        { text: "Flat-screen TV", hint: "" },
        { text: "In-Room Heating and A/C Controls", hint: "" },
        { text: "High Speed Free WiFi", hint: "" },
      ],
      buttonText: "Book now",
      buttonCaption: "",
      buttonLink: "",
      buttonLinkTarget: "_self",
    },
    {
      title: "Double Room",
      titleCaption: "",
      price: "$139",
      period: "/night",
      priceCaption: "",
      description: "2 full beds",
      imageUrl: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=500&fit=crop",
      features: [
        { text: "Private Bathroom", hint: "" },
        { text: "Mini Refrigerator", hint: "" },
        { text: "Flat-screen TV", hint: "" },
        { text: "In-Room Heating and A/C Controls", hint: "" },
        { text: "High Speed Free WiFi", hint: "" },
      ],
      buttonText: "Book now",
      buttonCaption: "",
      buttonLink: "",
      buttonLinkTarget: "_self",
    },
    {
      title: "King Room",
      titleCaption: "",
      price: "$159",
      period: "/night",
      priceCaption: "",
      description: "1 king bed",
      imageUrl: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=500&fit=crop",
      features: [
        { text: "Private Bathroom", hint: "" },
        { text: "Mini Refrigerator", hint: "" },
        { text: "Flat-screen TV", hint: "" },
        { text: "In-Room Heating and A/C Controls", hint: "" },
        { text: "High Speed Free WiFi", hint: "" },
      ],
      buttonText: "Book now",
      buttonCaption: "",
      buttonLink: "",
      buttonLinkTarget: "_self",
    },
  ],
};


const INITIAL_COMPARISON_TABLE: ComparisonTableData = {
  type: "comparison-table",
  title: "Compare Plans",
  categories: [
    {
      name: "Visual Essentials",
      features: [
        { name: "Visual Access", type: "text" },
        { name: "Team Members", type: "text" },
        { name: "Number of Downloads", type: "text" },
        { name: "Download Formats", type: "text" },
      ],
    },
    {
      name: "AI Features",
      features: [
        { name: "AI Credits", type: "text" },
        { name: "Preserve Content", type: "boolean" },
      ],
    },
    {
      name: "Branding",
      features: [
        { name: "Save & Apply Brand Colors", type: "boolean" },
        { name: "Brand Colors per Palette", type: "text" },
      ],
    },
  ],
  plans: [
    {
      name: "Free",
      price: "$0",
      period: "Free",
      buttonText: "Get Started",
      imageUrl: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=500&fit=crop",
      features: {
        "Visual Access": "First 7 days",
        "Team Members": "1-4",
        "Number of Downloads": "2",
        "Download Formats": "PNG",
        "AI Credits": "60",
        "Preserve Content": false,
        "Save & Apply Brand Colors": false,
        "Brand Colors per Palette": "0",
      },
    },
    {
      name: "Pro",
      price: "$14",
      period: "per member/month",
      buttonText: "Get Pro",
      imageUrl: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=500&fit=crop",
      features: {
        "Visual Access": "Unlimited",
        "Team Members": "1-100",
        "Number of Downloads": "Unlimited",
        "Download Formats": "PNG",
        "AI Credits": "500",
        "Preserve Content": false,
        "Save & Apply Brand Colors": false,
        "Brand Colors per Palette": "0",
      },
    },
    {
      name: "Business",
      price: "$24",
      period: "per member/month",
      buttonText: "Get Business",
      imageUrl: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=500&fit=crop",
      features: {
        "Visual Access": "Unlimited",
        "Team Members": "1-100",
        "Number of Downloads": "Unlimited",
        "Download Formats": "PNG, PDF, PowerPoint",
        "AI Credits": "1000",
        "Preserve Content": true,
        "Save & Apply Brand Colors": true,
        "Brand Colors per Palette": "Unlimited",
      },
    },
  ],
};

// ADD THIS BLOCK






// ==================== TEMPLATE SELECTOR ====================
interface TemplateCardProps {
  title: string;
  type: EditorType;
  isSelected: boolean;
  onSelect: (type: EditorType) => void;
  preview: React.ReactNode;
}

const TemplateCard = ({
  title,
  type,
  isSelected,
  onSelect,
  preview,
}: TemplateCardProps) => (
  <button
    onClick={() => onSelect(type)}
    className={`relative cursor-pointer transition-all duration-200
      ${isSelected
        ? "outline outline-3 outline-blue-500 shadow-lg shadow-blue-500/30 ring-0"
        : "outline outline-3 outline-transparent hover:outline-gray-600"
      }`}
  >
    <div className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors">
      <div className="rounded overflow-hidden mb-3 aspect-[4/3] flex items-center justify-center p-2 bg-gray-100">
        {preview}
      </div>
      <p className="text-white text-sm font-medium text-center">{title}</p>
    </div>
    {isSelected && (
      <div className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
        <svg
          className="w-4 h-4 text-white"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    )}
  </button>
);

const TemplateSelectorPage = ({
  onContinue,
}: {
  onContinue: (type: EditorType) => void;
}) => {
  const [selectedTemplate, setSelectedTemplate] =
    useState<EditorType>("pricing-columns");

  return (
    <div className="flex-1 bg-gray-900 flex overflow-hidden">
      {/* Sidebar */}
      <div className="w-96 bg-gray-950 p-6 flex flex-col">
        <h2 className="text-white text-xl font-semibold mb-6">
          Select a template to start with
        </h2>

        <div className="grid grid-cols-2 gap-4 flex-1">
          <TemplateCard
            title="Pricing Grid"
            type="pricing-grid"
            isSelected={selectedTemplate === "pricing-grid"}
            onSelect={setSelectedTemplate}
            preview={
              <div className="grid grid-cols-3 gap-1 w-full">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="bg-blue-100 rounded p-1 text-[6px] flex flex-col items-center"
                  >
                    <div className="w-4 h-4 bg-blue-300 rounded mb-1"></div>
                    <div className="w-full h-1 bg-blue-300 rounded mb-1"></div>
                    <div className="w-full h-1 bg-blue-200 rounded"></div>
                  </div>
                ))}
              </div>
            }
          />

          <TemplateCard
            title="Pricing Columns"
            type="pricing-columns"
            isSelected={selectedTemplate === "pricing-columns"}
            onSelect={setSelectedTemplate}
            preview={
              <div className="w-full h-full flex items-end justify-center pb-2">
                <PricingCardPreview
                  data={{
                    ...INITIAL_PRICING_CARD,
                    cards: INITIAL_PRICING_CARD.cards.slice(0, 3)
                  }}
                  appearance={{
                    primaryColor: "#000000",
                    secondaryColor: "#ffffff",
                    font: "Inter",
                    fontWeight: "400",
                    fontSize: 7, // Tiny!
                    buttonShape: "rounded",
                    buttonType: "filled",
                    columnStyle: "custom",
                  }}
                />
              </div>
            }
          />

          <TemplateCard
            title="Comparison Table"
            type="comparison-table"
            isSelected={selectedTemplate === "comparison-table"}
            onSelect={setSelectedTemplate}
            preview={
              <div className="w-full">
                <div className="grid grid-cols-4 gap-[2px] text-[5px]">
                  <div className="bg-gray-200 p-1"></div>
                  <div className="bg-blue-100 p-1"></div>
                  <div className="bg-blue-100 p-1"></div>
                  <div className="bg-blue-100 p-1"></div>
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="col-span-4 grid grid-cols-4 gap-[2px]"
                    >
                      <div className="bg-gray-100 p-1"></div>
                      <div className="bg-white p-1 flex items-center justify-center">
                        ✓
                      </div>
                      <div className="bg-white p-1 flex items-center justify-center">
                        ✓
                      </div>
                      <div className="bg-white p-1 flex items-center justify-center">
                        ✗
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            }
          />

          <TemplateCard
            title="Service Plans"
            type="service-plans"
            isSelected={selectedTemplate === "service-plans"}
            onSelect={setSelectedTemplate}
            preview={
              <div className="grid grid-cols-2 gap-1 w-full">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-blue-50 rounded p-1 flex flex-col">
                    <div className="text-[6px] font-bold mb-1">$0</div>
                    <div className="h-1 bg-blue-200 rounded mb-1"></div>
                    <div className="h-1 bg-blue-100 rounded"></div>
                  </div>
                ))}
              </div>
            }
          />
        </div>

        <button
          onClick={() => onContinue(selectedTemplate)}
          disabled={!selectedTemplate}
          className="mt-6 w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors"
        >
          Continue with this template
        </button>
      </div>

      {/* Preview Area */}
      <div className="flex-1 bg-white p-12 overflow-auto">

        <div className="max-w-7xl mx-auto">
          <div className="rounded-lg p-12" >
            {/* Real Pricing Preview */}
            {(selectedTemplate === "pricing-grid" || selectedTemplate === "pricing-columns") && (
              <PricingCardPreview
                data={INITIAL_PRICING_CARD}
                appearance={{
                  primaryColor: "#1F2937",
                  secondaryColor: "#F3F4F6",  // This is now actually used as card background
                  font: "Inter",
                  fontWeight: "400",
                  fontSize: 16,
                  buttonShape: "rounded",
                  buttonType: "filled",
                  columnStyle: "custom",
                }}
              />
            )}
            {selectedTemplate === "comparison-table" && (
              <ComparisonTablePreview data={INITIAL_COMPARISON_TABLE} />
            )}
            {selectedTemplate === "service-plans" && (
              <div className="text-center text-gray-500 py-20">
                <p className="text-2xl">Service Plans Template Coming Soon</p>
              </div>
            )}
            {!selectedTemplate && (
              <div className="text-center text-gray-400 py-32">
                <p className="text-xl">Select a template to see the live preview</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ==================== COMPARISON TABLE COMPONENTS ====================
interface ComparisonTableEditorProps {
  data: ComparisonTableData;
  onChange: (data: ComparisonTableData) => void;
}

// const ComparisonTableEditor = ({
//   data,
//   onChange,
// }: ComparisonTableEditorProps) => {
//   const handleTitleChange = (value: string) => {
//     onChange({ ...data, title: value });
//   };

//   const handlePlanChange = (
//     index: number,
//     field: "name" | "price" | "period",
//     value: string
//   ) => {
//     const newPlans = [...data.plans];
//     newPlans[index] = { ...newPlans[index], [field]: value };
//     onChange({ ...data, plans: newPlans });
//   };

//   const handleFeatureToggle = (planIndex: number, feature: string) => {
//     const newPlans = [...data.plans];
//     newPlans[planIndex].features[feature] =
//       !newPlans[planIndex].features[feature];
//     onChange({ ...data, plans: newPlans });
//   };

//   const handleAddPlan = () => {
//     const newFeatures: Record<string, boolean> = {};
//     data.featuresList.forEach((f) => (newFeatures[f] = false));

//     onChange({
//       ...data,
//       plans: [
//         ...data.plans,
//         {
//           name: "New Plan",
//           price: "$0",
//           period: "/month",
//           features: newFeatures,
//         },
//       ],
//     });
//   };

//   return (
//     <div className="space-y-4">
//       <InputField
//         label="Table Title"
//         value={data.title}
//         onChange={handleTitleChange}
//       />

//       <div>
//         <label className="block text-sm font-medium text-gray-300 mb-2">
//           Plans
//         </label>
//         {data.plans.map((plan, index) => (
//           <div
//             key={index}
//             className="mb-4 p-4 border border-gray-700 rounded-lg bg-gray-800"
//           >
//             <InputField
//               label="Plan Name"
//               value={plan.name}
//               onChange={(value) => handlePlanChange(index, "name", value)}
//             />
//             <div className="grid grid-cols-2 gap-2 mt-2">
//               <InputField
//                 label="Price"
//                 value={plan.price}
//                 onChange={(value) => handlePlanChange(index, "price", value)}
//               />
//               <InputField
//                 label="Period"
//                 value={plan.period}
//                 onChange={(value) => handlePlanChange(index, "period", value)}
//               />
//             </div>

//             <div className="mt-3">
//               <label className="block text-xs font-medium text-gray-400 mb-2">
//                 Features
//               </label>
//               <div className="space-y-1">
//                 {data.featuresList.map((feature) => (
//                   <label
//                     key={feature}
//                     className="flex items-center gap-2 text-sm text-gray-300"
//                   >
//                     <input
//                       type="checkbox"
//                       checked={plan.features[feature]}
//                       onChange={() => handleFeatureToggle(index, feature)}
//                       className="rounded"
//                     />
//                     {feature}
//                   </label>
//                 ))}
//               </div>
//             </div>
//           </div>
//         ))}
//         <button
//           onClick={handleAddPlan}
//           className="w-full px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
//         >
//           + Add Plan
//         </button>
//       </div>
//     </div>
//   );
// };



const STYLE_PRESETS = [
  { id: "style1", name: "Wave Header", primary: "#FF6B6B", secondary: "#FFE66D", font: "Poppins", fontWeight: "700", buttonShape: "rounded", buttonType: "filled" },
  { id: "style2", name: "Peach Full BG", primary: "#FFD8B1", secondary: "#FFA07A", font: "Helvetica", fontWeight: "400", buttonShape: "rounded", buttonType: "gradient" },
  { id: "style3", name: "Dark Green", primary: "#065F46", secondary: "#064E3B", font: "Georgia", fontWeight: "400", buttonShape: "pill", buttonType: "outline" },
];

const ComparisonTableEditor = ({
  data,
  onChange,
}: ComparisonTableEditorProps) => {
  const [editingPlanIndex, setEditingPlanIndex] = useState<number | null>(null);
  const [editingCategoryIndex, setEditingCategoryIndex] = useState<number | null>(null);
  //   const [editingPlanIndex, setEditingPlanIndex] = useState<number | null>(null);
  // const [editingCategoryIndex, setEditingCategoryIndex] = useState<number | null>(null);
  const [draggedPlanIndex, setDraggedPlanIndex] = useState<number | null>(null);
  const [dragOverPlanIndex, setDragOverPlanIndex] = useState<number | null>(null);



  const handlePlanDragStart = (index: number) => {
    setDraggedPlanIndex(index);
  };

  const handlePlanDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedPlanIndex !== null && draggedPlanIndex !== index) {
      setDragOverPlanIndex(index);
    }
  };

  const handlePlanDragLeave = () => {
    setDragOverPlanIndex(null);
  };

  const handlePlanDrop = (index: number) => {
    if (draggedPlanIndex !== null && draggedPlanIndex !== index) {
      const newPlans = [...data.plans];
      const [draggedPlan] = newPlans.splice(draggedPlanIndex, 1);
      newPlans.splice(index, 0, draggedPlan);
      onChange({ ...data, plans: newPlans });
    }
    setDraggedPlanIndex(null);
    setDragOverPlanIndex(null);
  };

  const handlePlanDragEnd = () => {
    setDraggedPlanIndex(null);
    setDragOverPlanIndex(null);
  };

  const handleTitleChange = (value: string) => {
    onChange({ ...data, title: value });
  };

  const handlePlanChange = (
    index: number,
    field: "name" | "price" | "period" | "buttonText" | "imageUrl",
    value: string
  ) => {
    const newPlans = [...data.plans];
    newPlans[index] = { ...newPlans[index], [field]: value };
    onChange({ ...data, plans: newPlans });
  };

  const handleFeatureChange = (planIndex: number, featureName: string, value: string | boolean) => {
    const newPlans = [...data.plans];
    newPlans[planIndex].features[featureName] = value;
    onChange({ ...data, plans: newPlans });
  };

  const handleAddPlan = () => {
    const newFeatures: Record<string, string | boolean> = {};
    data.categories.forEach((cat) => {
      cat.features.forEach((f) => {
        newFeatures[f.name] = f.type === "boolean" ? false : "";
      });
    });

    onChange({
      ...data,
      plans: [
        ...data.plans,
        {
          name: "New Plan",
          price: "$0",
          period: "/month",
          buttonText: "Get Started",
          features: newFeatures,
        },
      ],
    });
  };

  const handleAddCategory = () => {
    onChange({
      ...data,
      categories: [
        ...data.categories,
        {
          name: "New Category",
          features: [{ name: "New Feature", type: "text" }],
        },
      ],
    });
  };

  const handleAddFeatureToCategory = (categoryIndex: number) => {
    const newCategories = [...data.categories];

    // Generate unique feature name with number
    const existingFeatures = newCategories[categoryIndex].features;
    let counter = 1;
    let newFeatureName = `New Feature ${counter}`;

    // Keep incrementing until we find a unique name
    while (existingFeatures.some(f => f.name === newFeatureName)) {
      counter++;
      newFeatureName = `New Feature ${counter}`;
    }

    newCategories[categoryIndex].features.push({
      name: newFeatureName,
      type: "text",
    });

    // Add this feature to all plans
    const newPlans = data.plans.map((plan) => ({
      ...plan,
      features: { ...plan.features, [newFeatureName]: "" },
    }));

    onChange({ ...data, categories: newCategories, plans: newPlans });
  };

  return (
    <div className="space-y-4">
      {/* Only show title when not editing anything */}
      {editingPlanIndex === null && editingCategoryIndex === null && (
        <InputField
          label="Table Title"
          value={data.title}
          onChange={handleTitleChange}
        />
      )}

      {/* PLANS SECTION */}
      {editingCategoryIndex === null && (
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Columns
          </label>
          {editingPlanIndex === null ? (
            // COLLAPSED VIEW - Show all plans as clickable bars
            <>
              {data.plans.map((plan, index) => (
                <div
                  key={index}
                  draggable
                  onDragStart={() => handlePlanDragStart(index)}
                  onDragOver={(e) => handlePlanDragOver(e, index)}
                  onDragLeave={handlePlanDragLeave}
                  onDrop={() => handlePlanDrop(index)}
                  onDragEnd={handlePlanDragEnd}
                  className={`w-full mb-2 p-3 bg-gray-800 border rounded-lg flex items-center justify-between transition-all group cursor-grab active:cursor-grabbing
      ${draggedPlanIndex === index ? "opacity-50 border-gray-600" : ""}
      ${dragOverPlanIndex === index ? "border-blue-500 border-2 bg-gray-750" : "border-gray-700 hover:border-gray-600"}
    `}
                >
                  {/* Drag Handle */}
                  <div className="flex items-center gap-2 mr-2 text-gray-500">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M7 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM7 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM7 14a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM13 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM13 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM13 14a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
                    </svg>
                  </div>

                  <button
                    onClick={() => setEditingPlanIndex(index)}
                    className="flex items-center gap-3 flex-1 text-left"
                  >
                    {plan.imageUrl && (
                      <img
                        src={plan.imageUrl}
                        alt={plan.name}
                        className="w-10 h-10 object-cover rounded"
                      />
                    )}
                    <div>
                      <div className="text-white font-medium">{plan.name}</div>
                      <div className="text-gray-400 text-sm">{plan.price} {plan.period}</div>
                    </div>
                  </button>
                  <div className="flex items-center gap-2">
                    {data.plans.length > 1 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const newPlans = data.plans.filter((_, i) => i !== index);
                          onChange({ ...data, plans: newPlans });
                        }}
                        className="p-1.5 text-gray-500 hover:text-red-500 hover:bg-gray-700 rounded transition-colors"
                        title="Delete plan"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                    <svg
                      className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              ))}
              <button
                onClick={handleAddPlan}
                className="w-full px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                + Add Column
              </button>
            </>
          ) : (
            // EXPANDED VIEW - Show editor for selected plan
            <div>
              <button
                onClick={() => setEditingPlanIndex(null)}
                className="flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Columns
              </button>

              {(() => {
                const plan = data.plans[editingPlanIndex!];  // ← Use the actual plan!
                const index = editingPlanIndex!;

                return (
                  <div className="mb-4 p-4 border border-gray-700 rounded-lg bg-gray-800">
                    <InputField
                      label="Plan Name"
                      value={plan.name}
                      onChange={(value) => handlePlanChange(index, "name", value)}
                    />
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <InputField
                        label="Price"
                        value={plan.price}
                        onChange={(value) => handlePlanChange(index, "price", value)}
                      />
                      <InputField
                        label="Period"
                        value={plan.period}
                        onChange={(value) => handlePlanChange(index, "period", value)}
                      />
                    </div>
                    <div className="mt-2">
                      <InputField
                        label="Button Text"
                        value={plan.buttonText}
                        onChange={(value) => handlePlanChange(index, "buttonText", value)}
                      />
                    </div>

                    {/* Image Upload Section */}
                    <div className="mt-3">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Image (optional)
                      </label>
                      <div className="mb-3">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                handlePlanChange(index, "imageUrl", reader.result as string);
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          className="hidden"
                          id={`plan-image-${index}`}
                        />
                        <label
                          htmlFor={`plan-image-${index}`}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer transition-colors"
                        >
                          Upload from PC
                        </label>
                      </div>
                      <InputField
                        label="Or paste Image URL"
                        value={plan.imageUrl || ""}
                        placeholder="https://images.unsplash.com/..."
                        onChange={(value) => {
                          const cleanValue = value.trim() === "" ? "" : value.trim();
                          handlePlanChange(index, "imageUrl", cleanValue);
                        }}
                      />
                      {plan.imageUrl && (
                        <div className="mt-3 relative">
                          <img
                            src={plan.imageUrl}
                            alt="Preview"
                            className="w-full h-24 object-cover rounded-lg border border-gray-600"
                            onError={(e) => {
                              e.currentTarget.src = "https://via.placeholder.com/400x200?text=Invalid+Image";
                            }}
                          />
                          <button
                            onClick={() => handlePlanChange(index, "imageUrl", "")}
                            className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                            title="Remove image"
                          >
                            Remove
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Feature Values */}
                    <div className="mt-3">
                      <label className="block text-xs font-medium text-gray-400 mb-2">
                        Feature Values
                      </label>
                      <div className="space-y-2">
                        {data.categories.map((category) =>
                          category.features.map((feature) => (
                            <div key={feature.name}>
                              {feature.type === "boolean" ? (
                                <label className="flex items-center gap-2 text-sm text-gray-300">
                                  <input
                                    type="checkbox"
                                    checked={!!plan.features[feature.name]}
                                    onChange={(e) =>
                                      handleFeatureChange(index, feature.name, e.target.checked)
                                    }
                                    className="rounded"
                                  />
                                  {feature.name}
                                </label>
                              ) : (
                                <InputField
                                  label={feature.name}
                                  value={(plan.features[feature.name] as string) || ""}
                                  onChange={(value) =>
                                    handleFeatureChange(index, feature.name, value)
                                  }
                                />
                              )}
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      )}

      {/* CATEGORIES & FEATURES SECTION */}
      {editingPlanIndex === null && (
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Categories & Features
          </label>
          {editingCategoryIndex === null ? (

            <>
              {data.categories.map((category, catIndex) => (
                <div
                  key={catIndex}
                  className="w-full mb-2 p-3 bg-gray-800 border border-gray-700 rounded-lg flex items-center justify-between hover:border-gray-600 transition-colors group"
                >
                  <button
                    onClick={() => setEditingCategoryIndex(catIndex)}
                    className="flex items-center gap-3 flex-1 text-left"
                  >
                    <div>
                      <div className="text-white font-medium">{category.name}</div>
                      <div className="text-gray-400 text-sm">{category.features.length} features</div>
                    </div>
                  </button>
                  <div className="flex items-center gap-2">
                    {data.categories.length > 1 && (
                      <button
                        onClick={() => {
                          const newCategories = data.categories.filter((_, i) => i !== catIndex);
                          onChange({ ...data, categories: newCategories });
                        }}
                        className="p-1.5 text-gray-500 hover:text-red-500 hover:bg-gray-700 rounded transition-colors"
                        title="Delete category"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                    <svg
                      className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              ))}
              <button
                onClick={handleAddCategory}
                className="w-full px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                + Add Category
              </button>
            </>
          ) : (
            // EXPANDED VIEW - Show editor for selected category
            <div>
              <button
                onClick={() => setEditingCategoryIndex(null)}
                className="flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Categories
              </button>

              {(() => {
                const category = data.categories[editingCategoryIndex];
                const catIndex = editingCategoryIndex;
                return (
                  <div className="p-4 border border-gray-700 rounded-lg bg-gray-800">
                    <InputField
                      label="Category Name"
                      value={category.name}
                      onChange={(value) => {
                        const newCategories = [...data.categories];
                        newCategories[catIndex].name = value;
                        onChange({ ...data, categories: newCategories });
                      }}
                    />
                    <div className="mt-3">
                      <label className="block text-xs font-medium text-gray-400 mb-2">
                        Features
                      </label>
                      <div className="space-y-2">
                        {category.features.map((feature, featIndex) => (
                          <div key={featIndex} className="flex gap-2 items-center">
                            <input
                              type="text"
                              value={feature.name}
                              onChange={(e) => {
                                const newCategories = [...data.categories];
                                const oldName = newCategories[catIndex].features[featIndex].name;
                                const newName = e.target.value;
                                newCategories[catIndex].features[featIndex].name = newName;

                                // Update feature name in all plans
                                const newPlans = data.plans.map((plan) => {
                                  const newFeatures = { ...plan.features };
                                  if (oldName in newFeatures) {
                                    newFeatures[newName] = newFeatures[oldName];
                                    delete newFeatures[oldName];
                                  }
                                  return { ...plan, features: newFeatures };
                                });

                                onChange({ ...data, categories: newCategories, plans: newPlans });
                              }}
                              className="flex-1 px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-sm"
                            />
                            <select
                              value={feature.type}
                              onChange={(e) => {
                                const newCategories = [...data.categories];
                                newCategories[catIndex].features[featIndex].type = e.target.value as "text" | "boolean";
                                onChange({ ...data, categories: newCategories });
                              }}
                              className="px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-sm"
                            >
                              <option value="text">Text</option>
                              <option value="boolean">Yes/No</option>
                            </select>
                            {category.features.length > 1 && (
                              <button
                                onClick={() => {
                                  const featureName = category.features[featIndex].name;
                                  const newCategories = [...data.categories];
                                  newCategories[catIndex].features = newCategories[catIndex].features.filter((_, i) => i !== featIndex);

                                  // Remove feature from all plans
                                  const newPlans = data.plans.map((plan) => {
                                    const newFeatures = { ...plan.features };
                                    delete newFeatures[featureName];
                                    return { ...plan, features: newFeatures };
                                  });

                                  onChange({ ...data, categories: newCategories, plans: newPlans });
                                }}
                                className="p-1 text-gray-500 hover:text-red-500 hover:bg-gray-600 rounded transition-colors"
                                title="Delete feature"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={() => handleAddFeatureToCategory(catIndex)}
                        className="mt-2 w-full px-2 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                      >
                        + Add Feature
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// const ComparisonTablePreview = ({ data }: { data: ComparisonTableData }) => (
//   <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-4xl">
//     <h3 className="text-2xl font-bold text-center mb-6">{data.title}</h3>
//     <div className="overflow-x-auto">
//       <table className="w-full">
//         <thead>
//           <tr className="border-b-2 border-gray-300">
//             <th className="px-4 py-3 text-left">Feature</th>
//             {data.plans.map((plan, index) => (
//               <th key={index} className="px-4 py-3 text-center">
//                 <div className="font-bold text-lg">{plan.name}</div>
//                 <div className="text-blue-600 font-bold text-xl">
//                   {plan.price}
//                 </div>
//                 <div className="text-gray-500 text-sm">{plan.period}</div>
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {data.featuresList.map((feature, index) => (
//             <tr key={index} className="border-b border-gray-200">
//               <td className="px-4 py-3 font-medium">{feature}</td>
//               {data.plans.map((plan, planIndex) => (
//                 <td key={planIndex} className="px-4 py-3 text-center">
//                   {plan.features[feature] ? (
//                     <span className="text-green-500 text-2xl">✓</span>
//                   ) : (
//                     <span className="text-gray-300 text-2xl">✗</span>
//                   )}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   </div>
// );

const ComparisonTablePreview = ({ data }: { data: ComparisonTableData }) => {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(data.categories.map((c) => c.name))
  );

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(categoryName)) {
        newSet.delete(categoryName);
      } else {
        newSet.add(categoryName);
      }
      return newSet;
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl">
      <div className="p-6">
        <h3 className="text-3xl font-bold text-center mb-8">{data.title}</h3>

        {/* Plans Header with Images */}
        <div className="grid gap-4 mb-6" style={{ gridTemplateColumns: `200px repeat(${data.plans.length}, 1fr)` }}>
          {/* Empty cell for feature column */}
          <div></div>

          {/* Plan Cards */}
          {data.plans.map((plan, index) => (
            <div key={index} className="text-center">
              {/* Plan Image */}
              {plan.imageUrl ? (
                <div className="mb-4 rounded-lg overflow-hidden border-2 border-gray-200">
                  <img
                    src={plan.imageUrl}
                    alt={plan.name}
                    className="w-full h-32 object-cover"
                  />
                </div>
              ) : (
                <div className="mb-4 h-32 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400 text-xs">No image</span>
                </div>
              )}

              {/* Plan Info */}
              <div className="bg-black text-white py-4 px-3 rounded-lg mb-4">
                <h4 className="font-bold text-lg mb-2">{plan.name}</h4>
                <div className="text-3xl font-bold mb-1">{plan.price}</div>
                <div className="text-xs opacity-80">{plan.period}</div>
              </div>

              {/* CTA Button */}
              <button className="w-full bg-gradient-to-r from-pink-500 to-orange-500 text-white font-semibold py-3 rounded-lg hover:from-pink-600 hover:to-orange-600 transition-all">
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>

        {/* Feature Categories */}
        <div className="border-t border-gray-200">
          {data.categories.map((category, catIndex) => (
            <div key={catIndex}>
              {/* Category Header */}
              <button
                onClick={() => toggleCategory(category.name)}
                className="w-full flex items-center justify-between py-4 px-4 bg-gray-50 hover:bg-gray-100 transition-colors border-b border-gray-200"
              >
                <div className="flex items-center gap-3">
                  <svg
                    className={`w-4 h-4 transition-transform ${expandedCategories.has(category.name) ? "rotate-90" : ""
                      }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="font-bold text-lg uppercase text-cyan-600">
                    {category.name}
                  </span>
                </div>
              </button>

              {/* Category Features */}
              {expandedCategories.has(category.name) && (
                <div>
                  {category.features.map((feature, featIndex) => (
                    <div
                      key={featIndex}
                      className="grid gap-4 py-4 px-4 border-b border-gray-100 hover:bg-gray-50"
                      style={{ gridTemplateColumns: `200px repeat(${data.plans.length}, 1fr)` }}
                    >
                      {/* Feature Name */}
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-gray-700">
                          {feature.name}
                        </span>
                      </div>

                      {/* Feature Values for each plan */}
                      {data.plans.map((plan, planIndex) => (
                        <div key={planIndex} className="flex items-center justify-center">
                          {feature.type === "boolean" ? (
                            plan.features[feature.name] ? (
                              <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            ) : (
                              <svg className="w-6 h-6 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                  fillRule="evenodd"
                                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )
                          ) : (
                            <span className="text-sm text-gray-900 font-medium">
                              {plan.features[feature.name] || "-"}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const InputField = ({
  label,
  value,
  onChange,
  placeholder,
}: InputFieldProps) => (
  <div>
    <label className="block text-sm font-medium text-gray-300 mb-1">
      {label}
    </label>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

interface FeatureItemProps {
  value: string;
  onChange: (value: string) => void;
  onRemove: () => void;
}

const FeatureItem = ({ value, onChange, onRemove }: FeatureItemProps) => (
  <div className="flex gap-2">
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <button
      onClick={onRemove}
      className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
      aria-label="Remove feature"
    >
      ✕
    </button>
  </div>
);

interface PricingCardEditorProps {
  data: PricingCardData;
  onChange: (data: PricingCardData) => void;
}

const PricingCardEditor = ({ data, onChange }: PricingCardEditorProps) => {

  const [editingCardIndex, setEditingCardIndex] = useState<number | null>(null);
  const [editingTableIndex, setEditingTableIndex] = useState<number>(0); // ADD THIS
  const [viewingTableCards, setViewingTableCards] = useState<boolean>(false); // ADD THIS
  const [draggedCardIndex, setDraggedCardIndex] = useState<number | null>(null);
  const [dragOverCardIndex, setDragOverCardIndex] = useState<number | null>(null);

  // ADD THIS: Get current table's cards
  const currentCards = data.multiTableMode && data.tables
    ? (data.tables[editingTableIndex]?.cards || [])
    : data.cards;

  const handleCardDragStart = (index: number) => {
    setDraggedCardIndex(index);
  };

  const handleCardDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedCardIndex !== null && draggedCardIndex !== index) {
      setDragOverCardIndex(index);
    }
  };

  const handleCardDragLeave = () => {
    setDragOverCardIndex(null);
  };

  const handleCardDrop = (index: number) => {
    if (draggedCardIndex !== null && draggedCardIndex !== index) {
      const newCards = [...data.cards];
      const [draggedCard] = newCards.splice(draggedCardIndex, 1);
      newCards.splice(index, 0, draggedCard);
      onChange({ ...data, cards: newCards });
    }
    setDraggedCardIndex(null);
    setDragOverCardIndex(null);
  };

  const handleCardDragEnd = () => {
    setDraggedCardIndex(null);
    setDragOverCardIndex(null);
  };


  const handleCardChange = (
    index: number,
    field: string,
    value: string | boolean
  ) => {
    if (data.multiTableMode && data.tables) {
      const newTables = [...data.tables];
      newTables[editingTableIndex].cards[index] = {
        ...newTables[editingTableIndex].cards[index],
        [field]: value || (field === "imageUrl" ? undefined : value),
      };
      onChange({ ...data, tables: newTables });
    } else {
      const newCards = [...data.cards];
      newCards[index] = {
        ...newCards[index],
        [field]: value || (field === "imageUrl" ? undefined : value),
      };
      onChange({ ...data, cards: newCards });
    }
  };

  const handleFeatureChange = (
    cardIndex: number,
    featureIndex: number,
    field: "text" | "hint",
    value: string
  ) => {
    if (data.multiTableMode && data.tables) {
      const newTables = [...data.tables];
      newTables[editingTableIndex].cards[cardIndex].features[featureIndex][field] = value;
      onChange({ ...data, tables: newTables });
    } else {
      const newCards = [...data.cards];
      newCards[cardIndex].features[featureIndex][field] = value;
      onChange({ ...data, cards: newCards });
    }
  };

  const handleRemoveFeature = (cardIndex: number, featureIndex: number) => {
    if (data.multiTableMode && data.tables) {
      const newTables = [...data.tables];
      newTables[editingTableIndex].cards[cardIndex].features =
        newTables[editingTableIndex].cards[cardIndex].features.filter((_, i) => i !== featureIndex);
      onChange({ ...data, tables: newTables });
    } else {
      const newCards = [...data.cards];
      newCards[cardIndex].features = newCards[cardIndex].features.filter((_, i) => i !== featureIndex);
      onChange({ ...data, cards: newCards });
    }
  };

  const handleAddFeature = (cardIndex: number) => {
    if (data.multiTableMode && data.tables) {
      const newTables = [...data.tables];
      newTables[editingTableIndex].cards[cardIndex].features.push({ text: "New feature", hint: "" });
      onChange({ ...data, tables: newTables });
    } else {
      const newCards = [...data.cards];
      newCards[cardIndex].features.push({ text: "New feature", hint: "" });
      onChange({ ...data, cards: newCards });
    }
  };

  const handleAddCard = () => {
    const newCard = {
      title: "New Plan",
      price: "$0",
      period: "/month",
      description: "Description here",
      features: [{ text: "Feature 1", hint: "" }],
      buttonText: "Get Started",
    };

    if (data.multiTableMode && data.tables) {
      const newTables = [...data.tables];
      newTables[editingTableIndex].cards.push(newCard);
      onChange({ ...data, tables: newTables });
    } else {
      onChange({ ...data, cards: [...data.cards, newCard] });
    }
  };

  const handleRemoveCard = (index: number) => {
    if (data.multiTableMode && data.tables) {
      const newTables = [...data.tables];
      newTables[editingTableIndex].cards = newTables[editingTableIndex].cards.filter((_, i) => i !== index);
      onChange({ ...data, tables: newTables });
    } else {
      const newCards = data.cards.filter((_, i) => i !== index);
      onChange({ ...data, cards: newCards });
    }
  };


  const handlePlanDragStart = (index: number) => {
    setDraggedPlanIndex(index);
  };

  const handlePlanDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedPlanIndex !== null && draggedPlanIndex !== index) {
      setDragOverPlanIndex(index);
    }
  };

  const handlePlanDragLeave = () => {
    setDragOverPlanIndex(null);
  };

  const handlePlanDrop = (index: number) => {
    if (draggedPlanIndex !== null && draggedPlanIndex !== index) {
      const newPlans = [...data.plans];
      const [draggedPlan] = newPlans.splice(draggedPlanIndex, 1);
      newPlans.splice(index, 0, draggedPlan);
      onChange({ ...data, plans: newPlans });
    }
    setDraggedPlanIndex(null);
    setDragOverPlanIndex(null);
  };

  const handlePlanDragEnd = () => {
    setDraggedPlanIndex(null);
    setDragOverPlanIndex(null);
  };


  return (
    <div className="space-y-6">

      {/* WIDGET TITLE SECTION */}
{editingCardIndex === null && !data.multiTableMode && (
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <label className="block text-sm font-medium text-gray-300">
        Widget Title
      </label>
      <button
        onClick={() => onChange({ ...data, showWidgetTitle: !data.showWidgetTitle })}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          data.showWidgetTitle ? 'bg-blue-600' : 'bg-gray-600'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            data.showWidgetTitle ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>

    {data.showWidgetTitle && (
      <>
        <InputField
          label="Title"
          value={data.widgetTitle || ""}
          placeholder="Enter widget title"
          onChange={(value) => onChange({ ...data, widgetTitle: value })}
        />

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Title Color
          </label>
          <div className="flex gap-3 items-center">
            <input
              type="color"
              value={data.widgetTitleColor || "#FF6B6B"}
              onChange={(e) => onChange({ ...data, widgetTitleColor: e.target.value })}
              className="w-16 h-12 rounded cursor-pointer"
            />
            <input
              type="text"
              value={data.widgetTitleColor || "#FF6B6B"}
              onChange={(e) => onChange({ ...data, widgetTitleColor: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <InputField
          label="Caption"
          value={data.widgetTitleCaption || ""}
          placeholder="Enter caption"
          onChange={(value) => onChange({ ...data, widgetTitleCaption: value })}
        />

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Caption Color
          </label>
          <div className="flex gap-3 items-center">
            <input
              type="color"
              value={data.widgetCaptionColor || "#6B7280"}
              onChange={(e) => onChange({ ...data, widgetCaptionColor: e.target.value })}
              className="w-16 h-12 rounded cursor-pointer"
            />
            <input
              type="text"
              value={data.widgetCaptionColor || "#6B7280"}
              onChange={(e) => onChange({ ...data, widgetCaptionColor: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </>
    )}
  </div>
)}


      {/* CONDITIONAL RENDERING BASED ON MODE */}
      {data.multiTableMode ? (
        // ===== MULTI-TABLE MODE =====
        <>
          {editingCardIndex !== null ? (
            // LEVEL 3: CARD EDITOR
            <div>
              <button
                onClick={() => setEditingCardIndex(null)}
                className="flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Cards
              </button>

              {(() => {
                const card = currentCards[editingCardIndex];
                const cardIndex = editingCardIndex;

                return (
                  <div className="p-4 border border-gray-700 rounded-lg bg-gray-800">
                    {/* ALL YOUR CARD EDITING FIELDS - Keep existing code */}
                    <InputField
                      label="Plan Title"
                      value={card.title}
                      onChange={(value) => handleCardChange(cardIndex, "title", value)}
                    />

                    <div className="mt-4">
                      <InputField
                        label="Title Caption"
                        value={card.titleCaption || ""}
                        placeholder="e.g., Most Popular"
                        onChange={(value) => handleCardChange(cardIndex, "titleCaption", value)}
                      />
                    </div>
                    {/* SIMPLE PRICE INPUT */}
                    <div className="mt-4">
                      <InputField
                        label="Price"
                        value={card.price}
                        placeholder="$99 or 99 USD or anything"
                        onChange={(value) => handleCardChange(cardIndex, "price", value)}
                      />
                    </div>

                    {/* ADD THIS - Price Color Picker */}
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Price Color
                      </label>
                      <div className="flex gap-3 items-center">
                        <input
                          type="color"
                          value={card.priceColor || "#1F2937"}
                          onChange={(e) => handleCardChange(cardIndex, "priceColor", e.target.value)}
                          className="w-16 h-12 rounded cursor-pointer"
                        />
                        <input
                          type="text"
                          value={card.priceColor || "#1F2937"}
                          onChange={(e) => handleCardChange(cardIndex, "priceColor", e.target.value)}
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    {/* SIMPLE PERIOD INPUT */}
                    <div className="mt-4">
                      <InputField
                        label="Period / Unit"
                        value={card.period}
                        placeholder="/night or /month or per person"
                        onChange={(value) => handleCardChange(cardIndex, "period", value)}
                      />
                    </div>
                    <div className="mt-4">
                      <InputField
                        label="Price Caption"
                        value={card.priceCaption || ""}
                        placeholder="e.g., Billed annually"
                        onChange={(value) => handleCardChange(cardIndex, "priceCaption", value)}
                      />
                    </div>

                    <div className="mt-4 p-4 border border-gray-600 rounded-lg bg-gray-750">
                      <div className="flex items-center justify-between mb-3">
                        <label className="block text-sm font-medium text-gray-300">
                          Show Discount / Old Price
                        </label>
                        <button
                          onClick={() => handleCardChange(cardIndex, "oldPriceEnabled", !card.oldPriceEnabled)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${card.oldPriceEnabled ? 'bg-blue-600' : 'bg-gray-600'
                            }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${card.oldPriceEnabled ? 'translate-x-6' : 'translate-x-1'
                              }`}
                          />
                        </button>
                      </div>
                      {card.oldPriceEnabled && (
                        <div className="space-y-3">
                          <InputField
                            label="Old Price"
                            value={card.oldPrice || ""}
                            placeholder="$149 or 149 USD"
                            onChange={(value) => handleCardChange(cardIndex, "oldPrice", value)}
                          />

                          <InputField
                            label="Discount Label (optional)"
                            value={card.discountLabel || ""}
                            placeholder="Save 30% or -50%"
                            onChange={(value) => handleCardChange(cardIndex, "discountLabel", value)}
                          />

                          {/* ADD THIS - Discount Label Color Picker */}
                          {/* Discount Label Background Color */}
                          {card.discountLabel && (
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-2">
                                Discount Label Background Color
                              </label>
                              <div className="flex gap-3 items-center">
                                <input
                                  type="color"
                                  value={card.discountLabelColor || "#EF4444"}
                                  onChange={(e) => handleCardChange(cardIndex, "discountLabelColor", e.target.value)}
                                  className="w-16 h-12 rounded cursor-pointer"
                                />
                                <input
                                  type="text"
                                  value={card.discountLabelColor || "#EF4444"}
                                  onChange={(e) => handleCardChange(cardIndex, "discountLabelColor", e.target.value)}
                                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                              </div>
                            </div>
                          )}

                          {/* Discount Label Text Color */}
                          {card.discountLabel && (
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-2">
                                Discount Label Text Color
                              </label>
                              <div className="flex gap-3 items-center">
                                <input
                                  type="color"
                                  value={card.discountLabelTextColor || "#FFFFFF"}
                                  onChange={(e) => handleCardChange(cardIndex, "discountLabelTextColor", e.target.value)}
                                  className="w-16 h-12 rounded cursor-pointer"
                                />
                                <input
                                  type="text"
                                  value={card.discountLabelTextColor || "#FFFFFF"}
                                  onChange={(e) => handleCardChange(cardIndex, "discountLabelTextColor", e.target.value)}
                                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                    </div>

                    <div className="mt-4">
                      <InputField
                        label="Description"
                        value={card.description}
                        onChange={(value) => handleCardChange(cardIndex, "description", value)}
                      />
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Image (optional)
                      </label>
                      <div className="mb-3">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                handleCardChange(cardIndex, "imageUrl", reader.result as string);
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          className="hidden"
                          id={`image-upload-${cardIndex}`}
                        />
                        <label
                          htmlFor={`image-upload-${cardIndex}`}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          Upload from PC
                        </label>
                      </div>

                      <InputField
                        label="Or paste Image URL"
                        value={card.imageUrl || ""}
                        placeholder="https://images.unsplash.com/photo-..."
                        onChange={(value) => {
                          const cleanValue = value.trim() === "" ? undefined : value.trim();
                          handleCardChange(cardIndex, "imageUrl", cleanValue);
                        }}
                      />

                      {card.imageUrl && (
                        <div className="mt-3 relative">
                          <img
                            src={card.imageUrl}
                            alt="Preview"
                            className="w-full h-32 object-cover rounded-lg border border-gray-600"
                            onError={(e) => {
                              e.currentTarget.src = "https://via.placeholder.com/400x200?text=Invalid+Image";
                            }}
                          />
                          <button
                            onClick={() => handleCardChange(cardIndex, "imageUrl", "")}
                            className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                            title="Remove image"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Features
                      </label>
                      <div className="space-y-2">
                        {card.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="space-y-2 p-3 bg-gray-750 rounded-lg">
                            <div className="flex gap-2 items-center">
                              <div
                                draggable
                                onDragStart={(e) => {
                                  e.dataTransfer.setData("featureIndex", featureIndex.toString());
                                }}
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={(e) => {
                                  const fromIndex = parseInt(e.dataTransfer.getData("featureIndex"));
                                  if (fromIndex !== featureIndex) {
                                    if (data.multiTableMode && data.tables) {
                                      const newTables = [...data.tables];
                                      const newFeatures = [...newTables[editingTableIndex].cards[cardIndex].features];
                                      const [moved] = newFeatures.splice(fromIndex, 1);
                                      newFeatures.splice(featureIndex, 0, moved);
                                      newTables[editingTableIndex].cards[cardIndex].features = newFeatures;
                                      onChange({ ...data, tables: newTables });
                                    } else {
                                      const newCards = [...data.cards];
                                      const newFeatures = [...newCards[cardIndex].features];
                                      const [moved] = newFeatures.splice(fromIndex, 1);
                                      newFeatures.splice(featureIndex, 0, moved);
                                      newCards[cardIndex].features = newFeatures;
                                      onChange({ ...data, cards: newCards });
                                    }
                                  }
                                }}
                                className="cursor-grab active:cursor-grabbing text-gray-500 hover:text-gray-300"
                              >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M7 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM7 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM7 14a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM13 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM13 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM13 14a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
                                </svg>
                              </div>
                              <input
                                type="text"
                                value={feature.text}
                                onChange={(e) => handleFeatureChange(cardIndex, featureIndex, "text", e.target.value)}
                                placeholder="Feature text"
                                className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                              <button
                                onClick={() => handleRemoveFeature(cardIndex, featureIndex)}
                                className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                                aria-label="Remove feature"
                              >
                                ✕
                              </button>
                            </div>
                            <input
                              type="text"
                              value={feature.hint || ""}
                              onChange={(e) => handleFeatureChange(cardIndex, featureIndex, "hint", e.target.value)}
                              placeholder="Tooltip hint (optional)"
                              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={() => handleAddFeature(cardIndex)}
                        className="mt-2 w-full px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                      >
                        + Add Feature
                      </button>
                    </div>

                    <div className="mt-4">
                      <InputField
                        label="Button Text"
                        value={card.buttonText}
                        onChange={(value) => handleCardChange(cardIndex, "buttonText", value)}
                      />
                    </div>

                    <div className="mt-4">
                      <InputField
                        label="Button Caption"
                        value={card.buttonCaption || ""}
                        placeholder="e.g., No credit card required"
                        onChange={(value) => handleCardChange(cardIndex, "buttonCaption", value)}
                      />
                    </div>

                    <div className="mt-4">
                      <InputField
                        label="Button Link URL"
                        value={card.buttonLink || ""}
                        placeholder="https://example.com"
                        onChange={(value) => handleCardChange(cardIndex, "buttonLink", value)}
                      />
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Link Target
                      </label>
                      <select
                        value={card.buttonLinkTarget || "_self"}
                        onChange={(e) => handleCardChange(cardIndex, "buttonLinkTarget", e.target.value)}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="_self">Same Window</option>
                        <option value="_blank">New Tab</option>
                      </select>
                    </div>
                  </div>
                );
              })()}
            </div>
          ) : viewingTableCards ? (
            // LEVEL 2: CARDS LIST IN SELECTED TABLE
            <div>
              <button
                onClick={() => {
                  setViewingTableCards(false);
                  setEditingCardIndex(null);
                }}
                className="flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Tables
              </button>

              {/* TABLE TAB NAME EDITOR */}
    {data.multiTableMode && data.tables && (
      <div className="space-y-4 mb-6 p-4 border border-gray-700 rounded-lg bg-gray-800">
        <InputField
          label="Tab Name"
          value={data.tables[editingTableIndex].name}
          placeholder="e.g., Monthly, Yearly, Basic Plan"
          onChange={(value) => {
            const newTables = [...data.tables!];
            newTables[editingTableIndex] = {
              ...newTables[editingTableIndex],
              name: value
            };
            onChange({ ...data, tables: newTables });
          }}
        />
        
        <InputField
          label="Tab Caption (optional)"
          value={data.tables[editingTableIndex].caption || ""}
          placeholder="e.g., Save 20%, Most Popular"
          onChange={(value) => {
            const newTables = [...data.tables!];
            newTables[editingTableIndex] = {
              ...newTables[editingTableIndex],
              caption: value
            };
            onChange({ ...data, tables: newTables });
          }}
        />
      </div>
    )}


              {/* Multi-table mode: show table title options */}
              {data.multiTableMode && data.tables && (
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium text-gray-300">
                      Table Title
                    </label>
                    <button
                      onClick={() => {
                        const newTables = [...data.tables!];
                        newTables[editingTableIndex] = {
                          ...newTables[editingTableIndex],
                          showWidgetTitle: !newTables[editingTableIndex].showWidgetTitle
                        };
                        onChange({ ...data, tables: newTables });
                      }}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${data.tables[editingTableIndex].showWidgetTitle ? 'bg-blue-600' : 'bg-gray-600'
                        }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${data.tables[editingTableIndex].showWidgetTitle ? 'translate-x-6' : 'translate-x-1'
                          }`}
                      />
                    </button>
                  </div>

                  {data.tables[editingTableIndex].showWidgetTitle && (
                    <>
                      <InputField
                        label="Title"
                        value={data.tables[editingTableIndex].widgetTitle || ""}
                        placeholder="Enter table title"
                        onChange={(value) => {
                          const newTables = [...data.tables!];
                          newTables[editingTableIndex] = {
                            ...newTables[editingTableIndex],
                            widgetTitle: value
                          };
                          onChange({ ...data, tables: newTables });
                        }}
                      />

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Title Color
                        </label>
                        <div className="flex gap-3 items-center">
                          <input
                            type="color"
                            value={data.tables[editingTableIndex].widgetTitleColor || "#FF6B6B"}
                            onChange={(e) => {
                              const newTables = [...data.tables!];
                              newTables[editingTableIndex] = {
                                ...newTables[editingTableIndex],
                                widgetTitleColor: e.target.value
                              };
                              onChange({ ...data, tables: newTables });
                            }}
                            className="w-16 h-12 rounded cursor-pointer"
                          />
                          <input
                            type="text"
                            value={data.tables[editingTableIndex].widgetTitleColor || "#FF6B6B"}
                            onChange={(e) => {
                              const newTables = [...data.tables!];
                              newTables[editingTableIndex] = {
                                ...newTables[editingTableIndex],
                                widgetTitleColor: e.target.value
                              };
                              onChange({ ...data, tables: newTables });
                            }}
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>

                      <InputField
                        label="Caption"
                        value={data.tables[editingTableIndex].widgetTitleCaption || ""}
                        placeholder="Enter caption"
                        onChange={(value) => {
                          const newTables = [...data.tables!];
                          newTables[editingTableIndex] = {
                            ...newTables[editingTableIndex],
                            widgetTitleCaption: value
                          };
                          onChange({ ...data, tables: newTables });
                        }}
                      />

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Caption Color
                        </label>
                        <div className="flex gap-3 items-center">
                          <input
                            type="color"
                            value={data.tables[editingTableIndex].widgetCaptionColor || "#6B7280"}
                            onChange={(e) => {
                              const newTables = [...data.tables!];
                              newTables[editingTableIndex] = {
                                ...newTables[editingTableIndex],
                                widgetCaptionColor: e.target.value
                              };
                              onChange({ ...data, tables: newTables });
                            }}
                            className="w-16 h-12 rounded cursor-pointer"
                          />
                          <input
                            type="text"
                            value={data.tables[editingTableIndex].widgetCaptionColor || "#6B7280"}
                            onChange={(e) => {
                              const newTables = [...data.tables!];
                              newTables[editingTableIndex] = {
                                ...newTables[editingTableIndex],
                                widgetCaptionColor: e.target.value
                              };
                              onChange({ ...data, tables: newTables });
                            }}
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Cards in {data.tables?.[editingTableIndex]?.name}
                </label>
                {currentCards.map((card, index) => (
                  <div
                    key={index}
                    className="w-full mb-2 p-3 bg-gray-800 border border-gray-700 rounded-lg hover:border-gray-600 transition-colors"
                  >
                    <button
                      onClick={() => setEditingCardIndex(index)}
                      className="flex items-center gap-3 flex-1 text-left w-full"
                    >
                      {card.imageUrl && (
                        <img
                          src={card.imageUrl}
                          alt={card.title}
                          className="w-10 h-10 object-cover rounded"
                        />
                      )}
                      <div className="flex-1">
                        <div className="text-white font-medium">{card.title}</div>
                        <div className="text-gray-400 text-sm">{card.price} {card.period}</div>
                      </div>
                      <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                ))}
                <button
                  onClick={handleAddCard}
                  className="w-full px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  + Add Card
                </button>
              </div>
            </div>
          ) : (
            // LEVEL 1: TABLES LIST
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Tables
              </label>
              {data.tables?.map((table, index) => (
                <div
                  key={table.id}
                  className="w-full mb-2 p-3 bg-gray-800 border border-gray-700 rounded-lg hover:border-gray-600 transition-colors"
                >
                  <button
                    onClick={() => {
                      setEditingTableIndex(index);
                      setViewingTableCards(true);
                    }}
                    className="flex items-center gap-3 flex-1 text-left w-full"
                  >
                    <div className="flex-1">
                      <div className="text-white font-medium">{table.name}</div>
                      <div className="text-gray-400 text-sm">{table.cards.length} cards</div>
                    </div>
                    <div className="flex items-center gap-2">
                      {data.tables && data.tables.length > 1 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            const newTables = data.tables?.filter((_, i) => i !== index);
                            onChange({ ...data, tables: newTables });
                            if (editingTableIndex >= (newTables?.length || 0)) {
                              setEditingTableIndex(Math.max(0, (newTables?.length || 1) - 1));
                            }
                          }}
                          className="p-1.5 text-gray-500 hover:text-red-500 hover:bg-gray-700 rounded transition-colors"
                          title="Delete table"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      )}
                      <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </button>
                </div>
              ))}
              <button
                onClick={() => {
                  const newTable = {
                    id: `table_${(data.tables?.length || 0) + 1}`,
                    name: `Table ${(data.tables?.length || 0) + 1}`,
                    caption: "",
                    showWidgetTitle: false,
                    widgetTitle: "",
                    widgetTitleCaption: "",
                    widgetTitleColor: "#FF6B6B",
                    widgetCaptionColor: "#6B7280",
                    cards: [currentCards[0] || INITIAL_PRICING_CARD.tables![0].cards[0]],
                  };
                  onChange({ ...data, tables: [...(data.tables || []), newTable] });
                }}
                className="w-full px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                + Add Table
              </button>
            </div>
          )}
        </>
      ) : (
        // ===== SINGLE TABLE MODE (ORIGINAL BEHAVIOR) =====
        <>
          {editingCardIndex === null ? (
            // COLLAPSED VIEW - Show all cards as clickable bars
            <>
              {currentCards.map((card, index) => (
                <div
                  key={index}
                  draggable
                  onDragStart={() => handleCardDragStart(index)}
                  onDragOver={(e) => handleCardDragOver(e, index)}
                  onDragLeave={handleCardDragLeave}
                  onDrop={() => handleCardDrop(index)}
                  onDragEnd={handleCardDragEnd}
                  className={`w-full mb-2 p-3 bg-gray-800 border rounded-lg flex items-center justify-between transition-all group cursor-grab active:cursor-grabbing
              ${draggedCardIndex === index ? "opacity-50 border-gray-600" : ""}
              ${dragOverCardIndex === index ? "border-blue-500 border-2 bg-gray-750" : "border-gray-700 hover:border-gray-600"}
            `}
                >
                  <div className="flex items-center gap-2 mr-2 text-gray-500">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M7 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM7 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM7 14a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM13 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM13 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM13 14a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
                    </svg>
                  </div>
                  <button
                    onClick={() => setEditingCardIndex(index)}
                    className="flex items-center gap-3 flex-1 text-left"
                  >
                    {card.imageUrl && (
                      <img
                        src={card.imageUrl}
                        alt={card.title}
                        className="w-10 h-10 object-cover rounded"
                      />
                    )}
                    <div>
                      <div className="text-white font-medium">{card.title}</div>
                      <div className="text-gray-400 text-sm">{card.price} {card.period}</div>
                    </div>
                  </button>
                  <div className="flex items-center gap-2">
                    {data.cards.length > 1 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveCard(index);
                        }}
                        className="p-1.5 text-gray-500 hover:text-red-500 hover:bg-gray-700 rounded transition-colors"
                        title="Delete card"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                    <svg
                      className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              ))}

              <button
                onClick={handleAddCard}
                className="w-full px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                + Add Card
              </button>
            </>
          ) : (
            // Single-table mode card editor (same as multi-table Level 3)
            <div>
              <button
                onClick={() => setEditingCardIndex(null)}
                className="flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Cards
              </button>

              {/* ... Copy the entire card editor from multi-table Level 3 ... */}
              {(() => {
                const card = currentCards[editingCardIndex!];
                const cardIndex = editingCardIndex!;

                return (
                  <div className="p-4 border border-gray-700 rounded-lg bg-gray-800">
                    {/* ALL YOUR CARD EDITING FIELDS - Keep existing code */}
                    <InputField
                      label="Plan Title"
                      value={card.title}
                      onChange={(value) => handleCardChange(cardIndex, "title", value)}
                    />
                    <div className="mt-4">
                      <InputField
                        label="Title Caption"
                        value={card.titleCaption || ""}
                        placeholder="e.g., Most Popular"
                        onChange={(value) => handleCardChange(cardIndex, "titleCaption", value)}
                      />
                    </div>
                    <div className="mt-4">
                      <InputField
                        label="Price"
                        value={card.price}
                        placeholder="$99 or 99 USD or anything"
                        onChange={(value) => handleCardChange(cardIndex, "price", value)}
                      />
                    </div>

                    {/* ADD THIS - Price Color Picker */}
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Price Color
                      </label>
                      <div className="flex gap-3 items-center">
                        <input
                          type="color"
                          value={card.priceColor || "#1F2937"}
                          onChange={(e) => handleCardChange(cardIndex, "priceColor", e.target.value)}
                          className="w-16 h-12 rounded cursor-pointer"
                        />
                        <input
                          type="text"
                          value={card.priceColor || "#1F2937"}
                          onChange={(e) => handleCardChange(cardIndex, "priceColor", e.target.value)}
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <InputField
                        label="Period / Unit"
                        value={card.period}
                        placeholder="/night or /month or per person"
                        onChange={(value) => handleCardChange(cardIndex, "period", value)}
                      />
                    </div>
                    <div className="mt-4">
                      <InputField
                        label="Price Caption"
                        value={card.priceCaption || ""}
                        placeholder="e.g., Billed annually"
                        onChange={(value) => handleCardChange(cardIndex, "priceCaption", value)}
                      />
                    </div>
                    <div className="mt-4 p-4 border border-gray-600 rounded-lg bg-gray-750">
                      <div className="flex items-center justify-between mb-3">
                        <label className="block text-sm font-medium text-gray-300">
                          Show Discount / Old Price
                        </label>
                        <button
                          onClick={() => handleCardChange(cardIndex, "oldPriceEnabled", !card.oldPriceEnabled)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${card.oldPriceEnabled ? 'bg-blue-600' : 'bg-gray-600'
                            }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${card.oldPriceEnabled ? 'translate-x-6' : 'translate-x-1'
                              }`}
                          />
                        </button>
                      </div>
                      {card.oldPriceEnabled && (
                        <div className="space-y-3">
                          <InputField
                            label="Old Price"
                            value={card.oldPrice || ""}
                            placeholder="$149 or 149 USD"
                            onChange={(value) => handleCardChange(cardIndex, "oldPrice", value)}
                          />
                          <InputField
                            label="Discount Label (optional)"
                            value={card.discountLabel || ""}
                            placeholder="Save 30% or -50%"
                            onChange={(value) => handleCardChange(cardIndex, "discountLabel", value)}
                          />

                          {/* ADD THIS - Discount Label Color Picker */}
                          {/* Discount Label Background Color */}
                          {card.discountLabel && (
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-2">
                                Discount Label Background Color
                              </label>
                              <div className="flex gap-3 items-center">
                                <input
                                  type="color"
                                  value={card.discountLabelColor || "#EF4444"}
                                  onChange={(e) => handleCardChange(cardIndex, "discountLabelColor", e.target.value)}
                                  className="w-16 h-12 rounded cursor-pointer"
                                />
                                <input
                                  type="text"
                                  value={card.discountLabelColor || "#EF4444"}
                                  onChange={(e) => handleCardChange(cardIndex, "discountLabelColor", e.target.value)}
                                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                              </div>
                            </div>
                          )}

                          {/* Discount Label Text Color */}
                          {card.discountLabel && (
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-2">
                                Discount Label Text Color
                              </label>
                              <div className="flex gap-3 items-center">
                                <input
                                  type="color"
                                  value={card.discountLabelTextColor || "#FFFFFF"}
                                  onChange={(e) => handleCardChange(cardIndex, "discountLabelTextColor", e.target.value)}
                                  className="w-16 h-12 rounded cursor-pointer"
                                />
                                <input
                                  type="text"
                                  value={card.discountLabelTextColor || "#FFFFFF"}
                                  onChange={(e) => handleCardChange(cardIndex, "discountLabelTextColor", e.target.value)}
                                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="mt-4">
                      <InputField
                        label="Description"
                        value={card.description}
                        onChange={(value) => handleCardChange(cardIndex, "description", value)}
                      />
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Image (optional)
                      </label>
                      <div className="mb-3">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                handleCardChange(cardIndex, "imageUrl", reader.result as string);
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          className="hidden"
                          id={`image-upload-single-${cardIndex}`}
                        />
                        <label
                          htmlFor={`image-upload-single-${cardIndex}`}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          Upload from PC
                        </label>
                      </div>
                      <InputField
                        label="Or paste Image URL"
                        value={card.imageUrl || ""}
                        placeholder="https://images.unsplash.com/photo-..."
                        onChange={(value) => {
                          const cleanValue = value.trim() === "" ? undefined : value.trim();
                          handleCardChange(cardIndex, "imageUrl", cleanValue);
                        }}
                      />
                      {card.imageUrl && (
                        <div className="mt-3 relative">
                          <img
                            src={card.imageUrl}
                            alt="Preview"
                            className="w-full h-32 object-cover rounded-lg border border-gray-600"
                            onError={(e) => {
                              e.currentTarget.src = "https://via.placeholder.com/400x200?text=Invalid+Image";
                            }}
                          />
                          <button
                            onClick={() => handleCardChange(cardIndex, "imageUrl", "")}
                            className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                            title="Remove image"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Features
                      </label>
                      <div className="space-y-2">
                        {card.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="space-y-2 p-3 bg-gray-750 rounded-lg">
                            <div className="flex gap-2 items-center">
                              <div
                                draggable
                                onDragStart={(e) => {
                                  e.dataTransfer.setData("featureIndex", featureIndex.toString());
                                }}
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={(e) => {
                                  const fromIndex = parseInt(e.dataTransfer.getData("featureIndex"));
                                  if (fromIndex !== featureIndex) {
                                    const newCards = [...data.cards];
                                    const newFeatures = [...newCards[cardIndex].features];
                                    const [moved] = newFeatures.splice(fromIndex, 1);
                                    newFeatures.splice(featureIndex, 0, moved);
                                    newCards[cardIndex].features = newFeatures;
                                    onChange({ ...data, cards: newCards });
                                  }
                                }}
                                className="cursor-grab active:cursor-grabbing text-gray-500 hover:text-gray-300"
                              >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M7 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM7 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM7 14a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM13 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM13 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM13 14a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
                                </svg>
                              </div>
                              <input
                                type="text"
                                value={feature.text}
                                onChange={(e) => handleFeatureChange(cardIndex, featureIndex, "text", e.target.value)}
                                placeholder="Feature text"
                                className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                              <button
                                onClick={() => handleRemoveFeature(cardIndex, featureIndex)}
                                className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                                aria-label="Remove feature"
                              >
                                ✕
                              </button>
                            </div>
                            <input
                              type="text"
                              value={feature.hint || ""}
                              onChange={(e) => handleFeatureChange(cardIndex, featureIndex, "hint", e.target.value)}
                              placeholder="Tooltip hint (optional)"
                              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={() => handleAddFeature(cardIndex)}
                        className="mt-2 w-full px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                      >
                        + Add Feature
                      </button>
                    </div>
                    <div className="mt-4">
                      <InputField
                        label="Button Text"
                        value={card.buttonText}
                        onChange={(value) => handleCardChange(cardIndex, "buttonText", value)}
                      />
                    </div>
                    <div className="mt-4">
                      <InputField
                        label="Button Caption"
                        value={card.buttonCaption || ""}
                        placeholder="e.g., No credit card required"
                        onChange={(value) => handleCardChange(cardIndex, "buttonCaption", value)}
                      />
                    </div>
                    <div className="mt-4">
                      <InputField
                        label="Button Link URL"
                        value={card.buttonLink || ""}
                        placeholder="https://example.com"
                        onChange={(value) => handleCardChange(cardIndex, "buttonLink", value)}
                      />
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Link Target
                      </label>
                      <select
                        value={card.buttonLinkTarget || "_self"}
                        onChange={(e) => handleCardChange(cardIndex, "buttonLinkTarget", e.target.value)}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="_self">Same Window</option>
                        <option value="_blank">New Tab</option>
                      </select>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </>
      )}

      {/* MULTI-TABLE MODE SECTION */}
      <div className="space-y-4 p-4 border border-gray-700 rounded-lg bg-gray-800">
        <div className="flex items-center justify-between">
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Multiple Tables Mode
            </label>
            <p className="text-xs text-gray-400 mt-1">
              Create multiple tables and toggle between them (e.g., Monthly vs Yearly pricing)
            </p>
          </div>
          <button
            onClick={() => {
              const newData = { ...data, multiTableMode: !data.multiTableMode };
              if (!data.multiTableMode) {
                // Switching TO multi-table mode
                newData.tables = [{
                  id: "table_1",
                  name: "Table 1",
                  caption: "",
                  cards: data.cards.length > 0 ? [...data.cards] : [INITIAL_PRICING_CARD.tables![0].cards[0]],
                }];
              }
              onChange(newData);
              setEditingTableIndex(0);
              setViewingTableCards(false); // Reset view
              setEditingCardIndex(null);
            }}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${data.multiTableMode ? 'bg-blue-600' : 'bg-gray-600'
              }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${data.multiTableMode ? 'translate-x-6' : 'translate-x-1'
                }`}
            />
          </button>
        </div>
      </div>

    </div>
  );
};

const PricingCardPreview = ({
  data,
  appearance = {
    primaryColor: "#1F2937",
    secondaryColor: "#F3F4F6",
    font: "Inter",
    fontWeight: "400",
    fontSize: 16,
    buttonStyle: "rounded",
    columnStyle: "custom",
  },
}: {
  data: PricingCardData;
  appearance?: AppearanceSettings;
}) => {

  const [activeTableIndex, setActiveTableIndex] = useState(0);

  // ADD THIS: Reset activeTableIndex if it's out of bounds
  React.useEffect(() => {
    if (data.multiTableMode && data.tables) {
      if (activeTableIndex >= data.tables.length) {
        setActiveTableIndex(0);
      }
    }
  }, [data.multiTableMode, data.tables, activeTableIndex]);

  const currentCards = data.multiTableMode && data.tables
    ? (data.tables[activeTableIndex]?.cards || [])
    : data.cards;

  const isCustom = appearance.columnStyle === "custom";
  const preset = STYLE_PRESETS.find(p => p.id === appearance.columnStyle);

  // Use preset colors if a style is selected, otherwise use custom colors
  const Primary_Color = isCustom ? appearance.secondaryColor : (preset?.primary || appearance.secondaryColor);
  const Secondary_Color = isCustom ? appearance.primaryColor : (preset?.secondary || appearance.primaryColor);

  const buttonRadius = appearance.buttonRadius + "px";

  return (
    <div>

      {/* TABLE TABS */}
      {data.multiTableMode && data.tables && data.tables.length > 1 && (
        <div className="flex justify-center gap-2 mb-8">
          {data.tables.map((table, index) => (
            <button
              key={table.id}
              onClick={() => setActiveTableIndex(index)}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${activeTableIndex === index
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
            >
              {table.name}
              {table.caption && (
                <span className="block text-xs opacity-75 mt-1">{table.caption}</span>
              )}
            </button>
          ))}
        </div>
      )}

      {/* WIDGET TITLE SECTION */}
      {(() => {
        const currentTitle = data.multiTableMode && data.tables
          ? data.tables[activeTableIndex]
          : data;

        return currentTitle.showWidgetTitle && (currentTitle.widgetTitle || currentTitle.widgetTitleCaption) && (
          <div className="text-center mb-8">
            {currentTitle.widgetTitle && (
              <h2
                className="font-bold mb-2"
                style={{
                  fontSize: `${appearance.fontSize * 2}px`,
                  color: currentTitle.widgetTitleColor || "#FF6B6B"
                }}
              >
                {currentTitle.widgetTitle}
              </h2>
            )}
            {currentTitle.widgetTitleCaption && (
              <p
                className="opacity-70"
                style={{
                  fontSize: `${appearance.fontSize}px`,
                  color: currentTitle.widgetCaptionColor || "#6B7280"
                }}
              >
                {currentTitle.widgetTitleCaption}
              </p>
            )}
          </div>
        );
      })()}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {currentCards.map((card, index) => (
          <div
            key={index}
            className="rounded-2xl shadow-2xl overflow-hidden flex flex-col transition-all duration-500 bg-white"
            style={{
              // Only Peach Full BG gets full background, others use Primary_Color
              backgroundColor: appearance.columnStyle === "style2" ? "white" : Primary_Color,
              color: Secondary_Color,
              fontSize: `${appearance.fontSize}px`,
              lineHeight: "1.5",
            }}
          >
            {/* Image */}
            <div className="h-48 w-full overflow-hidden">
              <img
                src={card.imageUrl || "https://via.placeholder.com/800x500"}
                alt={card.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* STYLE 1: Wave Header */}
            {appearance.columnStyle === "style1" && (
              <div className="p-8 text-center">
                <h3 style={{ fontSize: `${appearance.fontSize * 1.875}px` }} className="font-bold text-white">{card.title}</h3>
                <p style={{ fontSize: `${appearance.fontSize * 1.125}px` }} className="opacity-90 text-white">{card.description}</p>
              </div>
            )}

            {/* STYLE 2 & 3: Full Colored Background */}
            {/* STYLE 2: Peach Full BG */}
            {appearance.columnStyle === "style2" && (
              <div
                className="p-8 text-center"
                style={{
                  backgroundColor: Primary_Color,
                }}
              >
                <h3
                  style={{ fontSize: `${appearance.fontSize * 1.875}px` }}
                  className="font-bold mb-2 text-gray-800"
                >
                  {card.title}
                </h3>
                <p
                  style={{ fontSize: `${appearance.fontSize * 1.125}px` }}
                  className="mb-0 text-gray-600"
                >
                  {card.description}
                </p>
              </div>
            )}

            {/* STYLE 3: Dark Green */}
            {appearance.columnStyle === "style3" && (
              <div className="p-8 text-center">
                <h3 style={{ fontSize: `${appearance.fontSize * 1.875}px` }} className="font-bold mb-2 text-white">
                  {card.title}
                </h3>
                <p style={{ fontSize: `${appearance.fontSize * 1.125}px` }} className="mb-6 text-gray-200">
                  {card.description}
                </p>
              </div>
            )}

            {/* DEFAULT: Custom style - clean card */}
            {/* Title Section - NO description */}
            {isCustom && (
              <div className="px-8 pt-6 pb-3">
                <div className="text-center">
                  <h3 style={{ fontSize: `${appearance.fontSize * 1.5}px` }} className="font-bold mb-1">{card.title}</h3>
                  {card.titleCaption && (
                    <p style={{ fontSize: `${appearance.fontSize * 0.75}px` }} className="opacity-60 mb-1">{card.titleCaption}</p>
                  )}
                </div>
              </div>
            )}

            {/* PRICE SECTION - Simple display */}
            <div className="px-8 text-center py-2 relative">
              {/* Discount Badge */}
              {/* Discount Badge */}
              {card.oldPriceEnabled && card.discountLabel && (
                <div className="absolute top-0 right-8">
                  <span
                    className="inline-block px-3 py-1 rounded-full text-xs font-bold"
                    style={{
                      backgroundColor: card.discountLabelColor || '#EF4444',
                      color: card.discountLabelTextColor || '#FFFFFF',
                      fontSize: `${appearance.fontSize * 0.75}px`
                    }}
                  >
                    {card.discountLabel}
                  </span>
                </div>
              )}

              {/* Old Price (strikethrough) */}
              {card.oldPriceEnabled && card.oldPrice && (
                <div className="mb-1">
                  <span
                    className="line-through opacity-50"
                    style={{ fontSize: `${appearance.fontSize * 1.5}px` }}
                  >
                    {card.oldPrice}
                  </span>
                </div>
              )}

              {/* Current Price - Just display what user typed */}
              <div>
                <span
                  style={{
                    fontSize: `${appearance.fontSize * 3.125}px`,
                    color: card.priceColor || (appearance.columnStyle === "style2" ? "#1F2937" : "inherit")
                  }}
                  className="font-bold"
                >
                  {card.price}
                </span>
                <span
                  style={{
                    fontSize: `${appearance.fontSize * 1.125}px`,
                    color: card.priceColor || (appearance.columnStyle === "style2" ? "#4B5563" : "inherit")
                  }}
                  className="opacity-80"
                >
                  {card.period}
                </span>
              </div>

              {/* Price Caption */}
              {card.priceCaption && (
                <p style={{ fontSize: `${appearance.fontSize * 0.75}px` }} className="opacity-60 mt-1">{card.priceCaption}</p>
              )}

              {/* DESCRIPTION - MOVED HERE */}
              <p
                style={{
                  fontSize: `${appearance.fontSize * 0.875}px`,
                  color: appearance.columnStyle === "style2" ? "#6B7280" : "inherit"
                }}
                className="opacity-80 mt-3"
              >
                {card.description}
              </p>
            </div>

            {/* Features */}
            <div className="px-8 py-6" style={{ minHeight: '280px' }}>
              <ul className="space-y-4">
                {card.features.map((feature, i) => (
                  <li key={i} className="flex items-start group relative">
                    <svg
                      style={{ width: `${appearance.fontSize * 1.5}px`, height: `${appearance.fontSize * 1.5}px` }}
                      className="mr-3 mt-0.5 flex-shrink-0"
                      fill={appearance.columnStyle === "style2" ? "#10B981" : (isCustom ? Primary_Color : "white")}
                      viewBox="0 0 20 20"
                    >
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                    </svg>
                    <span style={{ fontSize: `${appearance.fontSize}px` }} className="flex items-center gap-1">
                      {feature.text}
                      {feature.hint && (
                        <>
                          <svg
                            className="w-4 h-4 opacity-60 cursor-help inline-block"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                          </svg>
                          <span className="absolute left-0 bottom-full mb-2 hidden group-hover:block bg-gray-900 text-white text-xs rounded py-1 px-2 whitespace-nowrap z-10">
                            {feature.hint}
                          </span>
                        </>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* ADDED: Spacer to push button to bottom */}
            <div className="flex-grow"></div>


            {/* Button + Footer */}
            <div className="px-8 pb-8">
              {card.buttonLink ? (
                <a
                  href={card.buttonLink}
                  target={card.buttonLinkTarget || "_self"}
                  rel={card.buttonLinkTarget === "_blank" ? "noopener noreferrer" : undefined}
                  style={{
                    background:
                      appearance.buttonType === "filled"
                        ? (isCustom ? appearance.primaryColor : Primary_Color)
                        : appearance.buttonType === "gradient"
                          ? (isCustom
                            ? `linear-gradient(to right, ${appearance.primaryColor}, ${appearance.secondaryColor})`
                            : `linear-gradient(to right, ${Primary_Color}, ${Primary_Color}dd)`)
                          : "transparent",
                    border:
                      appearance.buttonType === "outline"
                        ? `2px solid ${isCustom ? appearance.primaryColor : Primary_Color}`
                        : "none",
                    color:
                      appearance.buttonType === "outline"
                        ? (isCustom ? appearance.primaryColor : Primary_Color)
                        : "white",
                    borderRadius: buttonRadius,
                    fontSize: `${appearance.fontSize * 1.125}px`,
                  }}
                  className="block w-full text-center font-bold py-4 transition-all transform hover:scale-105 shadow-lg"
                >
                  {card.buttonText}
                </a>
              ) : (
                <button
                  style={{
                    background:
                      appearance.buttonType === "filled"
                        ? (isCustom ? appearance.primaryColor : Primary_Color)
                        : appearance.buttonType === "gradient"
                          ? (isCustom
                            ? `linear-gradient(to right, ${appearance.primaryColor}, ${appearance.secondaryColor})`
                            : `linear-gradient(to right, ${Primary_Color}, ${Primary_Color}dd)`)
                          : "transparent",
                    border:
                      appearance.buttonType === "outline"
                        ? `2px solid ${isCustom ? appearance.primaryColor : Primary_Color}`
                        : "none",
                    color:
                      appearance.buttonType === "outline"
                        ? (isCustom ? appearance.primaryColor : Primary_Color)
                        : "white",
                    borderRadius: buttonRadius,
                    fontSize: `${appearance.fontSize * 1.125}px`,
                  }}
                  className="w-full font-bold py-4 transition-all transform hover:scale-105 shadow-lg"
                >
                  {card.buttonText}
                </button>
              )}

              {card.buttonCaption ? (
                <p
                  style={{ fontSize: `${appearance.fontSize * 0.75}px` }}
                  className="text-center mt-3 opacity-70"
                >
                  {card.buttonCaption}
                </p>
              ) : (
                <p
                  style={{ fontSize: `${appearance.fontSize * 0.75}px` }}
                  className="text-center mt-3 opacity-70"
                >
                  No booking or credit card fees!
                </p>
              )}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};



const EditorPage = ({ editorType }: { editorType: EditorType }) => {
  const getInitialData = (): EditorData => {
    switch (editorType) {
      case "comparison-table":
        return INITIAL_COMPARISON_TABLE;
      case "pricing-grid":
      case "pricing-columns":
      default:
        return INITIAL_PRICING_CARD;
    }
  };

  const [editorData, setEditorData] = useState<EditorData>(getInitialData());
  const [activeTab, setActiveTab] = useState<"content" | "appearance">("content");

  const [appearance, setAppearance] = useState<AppearanceSettings>({
    primaryColor: "#1F2937",
    secondaryColor: "#F3F4F6",
    font: "Inter",
    fontWeight: "400",
    fontSize: 16,
    buttonShape: "rounded",
    buttonRadius: 12, // ADD THIS LINE
    buttonType: "filled",
    columnStyle: "custom",
  });



  return (
    <div className="flex-1 bg-gray-900 flex overflow-hidden">
      {/* Left Sidebar */}
      <div className="w-96 bg-gray-950 flex flex-col">
        {/* Tabs */}
        <div className="flex border-b border-gray-800">
          <button
            onClick={() => setActiveTab("content")}
            className={`flex-1 px-4 py-3 flex items-center justify-center gap-2 ${activeTab === "content" ? "bg-gray-900 text-white" : "text-gray-400 hover:text-white"}`}
          >
            Content
          </button>
          <button
            onClick={() => setActiveTab("appearance")}
            className={`flex-1 px-4 py-3 flex items-center justify-center gap-2 ${activeTab === "appearance" ? "bg-gray-900 text-white" : "text-gray-400 hover:text-white"}`}
          >
            Appearance
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
          {activeTab === "content" && (
            <div>
              <h2 className="text-white text-xl font-semibold mb-6">Content</h2>
              {(editorData.type === "pricing-grid" || editorData.type === "pricing-columns") && (
                <PricingCardEditor data={editorData} onChange={setEditorData} />
              )}
              {editorData.type === "comparison-table" && (
                <ComparisonTableEditor data={editorData} onChange={setEditorData} />
              )}
            </div>
          )}

          {activeTab === "appearance" && (
            <div className="space-y-8">
              <h2 className="text-white text-xl font-semibold">Appearance</h2>

              {/* Column Style Presets */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-4">Quick Styles</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setAppearance(a => ({ ...a, columnStyle: "custom" }))}
                    className={`p-4 rounded-lg border-2 transition-all ${appearance.columnStyle === "custom" ? "border-blue-500 bg-blue-900/20" : "border-gray-700"}`}
                  >
                    <div className="text-center font-medium text-white">Custom</div>
                  </button>
                  {STYLE_PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => setAppearance({
                        ...appearance,
                        primaryColor: preset.secondary,
                        secondaryColor: preset.primary,
                        font: preset.font,
                        fontWeight: preset.fontWeight,
                        buttonShape: preset.buttonShape,
                        buttonType: preset.buttonType,
                        columnStyle: preset.id,
                      })}
                      className={`p-4 rounded-lg border-2 transition-all ${appearance.columnStyle === preset.id ? "border-blue-500" : "border-gray-700"}`}
                    >
                      <div className="w-full h-12 rounded mb-2" style={{ backgroundColor: preset.primary }}></div>
                      <div className="text-center text-xs text-gray-400">{preset.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Settings - Only show when custom */}
              {appearance.columnStyle === "custom" && (
                <>
                  {/* Primary = Text Color */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Text Color (Primary)
                    </label>
                    <div className="flex gap-3 items-center">
                      <input
                        type="color"
                        value={appearance.primaryColor}
                        onChange={(e) => setAppearance({ ...appearance, primaryColor: e.target.value })}
                        className="w-16 h-12 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={appearance.primaryColor}
                        onChange={(e) => setAppearance({ ...appearance, primaryColor: e.target.value })}
                        className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                      />
                    </div>
                  </div>

                  {/* Secondary = Background Color */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Background Color (Secondary)
                    </label>
                    <div className="flex gap-3 items-center">
                      <input
                        type="color"
                        value={appearance.secondaryColor}
                        onChange={(e) => setAppearance({ ...appearance, secondaryColor: e.target.value })}
                        className="w-16 h-12 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={appearance.secondaryColor}
                        onChange={(e) => setAppearance({ ...appearance, secondaryColor: e.target.value })}
                        className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                      />
                    </div>
                  </div>

                  {/* Font Size */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Font Size: {appearance.fontSize}px
                    </label>
                    <input
                      type="range"
                      min="12"
                      max="32"
                      step="1"
                      value={appearance.fontSize}
                      onChange={(e) => setAppearance({ ...appearance, fontSize: Number(e.target.value) })}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>

                  {/* Font Family */}
                  {/* Font Family */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Font Family</label>
                    <select
                      value={appearance.font}
                      onChange={(e) => setAppearance({ ...appearance, font: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white"
                    >
                      <option value="Inter">Inter (Clean)</option>
                      <option value="Poppins">Poppins (Bold)</option>
                      <option value="Roboto">Roboto</option>
                      <option value="Georgia">Georgia (Elegant)</option>
                      <option value="system-ui">System Default</option>
                    </select>
                  </div>

                  {/* Font Weight */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Font Weight</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setAppearance({ ...appearance, fontWeight: "400" })}
                        className={`py-3 px-6 font-normal transition-all rounded-lg ${appearance.fontWeight === "400" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300"
                          }`}
                      >
                        Regular
                      </button>
                      <button
                        onClick={() => setAppearance({ ...appearance, fontWeight: "700" })}
                        className={`py-3 px-6 font-bold transition-all rounded-lg ${appearance.fontWeight === "700" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300"
                          }`}
                      >
                        Bold
                      </button>
                    </div>
                  </div>

                  {/* Button Style */}
                  {/* Button Shape */}
                  {/* Button Shape */}
                  {/* Button Border Radius */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Button Border Radius: {appearance.buttonRadius}px
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="1"
                      value={appearance.buttonRadius}
                      onChange={(e) => {
                        const radius = Number(e.target.value);
                        setAppearance({ ...appearance, buttonRadius: radius });
                      }}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-2">
                      <span>0px</span>
                      <span>25px</span>
                      <span>50px</span>
                      <span>75px</span>
                      <span>100px</span>
                    </div>
                  </div>

                  {/* Button Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Button Type</label>
                    <div className="grid grid-cols-3 gap-3">
                      <button
                        onClick={() => setAppearance({ ...appearance, buttonType: "filled" })}
                        className={`py-3 px-6 font-medium transition-all rounded-lg ${appearance.buttonType === "filled" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300"
                          }`}
                      >
                        Filled
                      </button>
                      <button
                        onClick={() => setAppearance({ ...appearance, buttonType: "outline" })}
                        className={`py-3 px-6 font-medium transition-all rounded-lg ${appearance.buttonType === "outline" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300"
                          }`}
                      >
                        Outline
                      </button>
                      <button
                        onClick={() => setAppearance({ ...appearance, buttonType: "gradient" })}
                        className={`py-3 px-6 font-medium transition-all rounded-lg ${appearance.buttonType === "gradient" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300"
                          }`}
                      >
                        Gradient
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 bg-white p-12 overflow-auto">
        {/* Google Fonts */}
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Poppins:wght@400;700&family=Roboto:wght@400;700&display=swap" rel="stylesheet" />

        <div className="flex items-start justify-center">
          <div style={{
            fontFamily: appearance.font === "system-ui" ? "system-ui, sans-serif" : `"${appearance.font}", sans-serif`,
            fontWeight: appearance.fontWeight
          }}>
            {/* Pricing Cards / Grid */}
            {(editorData.type === "pricing-grid" || editorData.type === "pricing-columns") && (
              <PricingCardPreview
                data={editorData as PricingCardData}
                appearance={appearance}
              />
            )}

            {/* Comparison Table */}
            {editorData.type === "comparison-table" && (
              <ComparisonTablePreview
                data={editorData as ComparisonTableData}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ==================== MAIN APP ====================
// function App() {
//   const [currentPage, setCurrentPage] = useState<"selector" | "editor">(
//     "selector"
//   );
//   const [selectedEditorType, setSelectedEditorType] =
//     useState<EditorType>("pricing-columns");

//   const handleContinue = (type: EditorType) => {
//     setSelectedEditorType(type);
//     setCurrentPage("editor");
//   };
function App() {
  const [currentPage, setCurrentPage] = useState<"selector" | "products" | "editor">(
    "selector"
  );
  const [selectedEditorType, setSelectedEditorType] =
    useState<EditorType>("pricing-columns");
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const handleContinue = (type: EditorType) => {
    setSelectedEditorType(type);
    if (type === "comparison-table") {
      setCurrentPage("products");
    } else {
      setCurrentPage("editor");
    }
  };

  const handleSelectProduct = (productId: string) => {
    setSelectedProduct(productId);
    setCurrentPage("editor");
  };

  const handleBack = () => {
    setCurrentPage("selector");
  };

  return (
    <>
      <div className="h-screen bg-gray-900 flex flex-col overflow-hidden">

        {/* for now this is commented just to make a back button. so instead of this code the below code is replaced just for some testing */}
        {/* <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-pink-100 rounded flex items-center justify-center">
              <svg
                className="w-5 h-5 text-pink-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
            </div>
            <span className="text-gray-800 font-medium">
              Untitled Pricing Table
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors">
              Publish
            </button>
            <button className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium">
              Close
            </button>
          </div>
        </div> */}

        {/* this is the new code  */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* ADD BACK BUTTON - Only show in editor */}
            {currentPage === "editor" && (
              <button
                onClick={() => window.location.reload()}
                className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                title="Start Over"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
            )}

            <div className="w-8 h-8 bg-pink-100 rounded flex items-center justify-center">
              <svg
                className="w-5 h-5 text-pink-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
            </div>
            <span className="text-gray-800 font-medium">
              Untitled Pricing Table
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors">
              Publish
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
            >
              Close
            </button>
          </div>
        </div>

        {currentPage === "selector" ? (
          <TemplateSelectorPage onContinue={handleContinue} />
        ) : (
          <EditorPage editorType={selectedEditorType} />
        )}
      </div>
    </>
  );
}

export default App;