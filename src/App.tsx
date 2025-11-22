import { useState } from "react";

// ==================== TYPES ====================
type EditorType =
  | "pricing-grid"
  | "pricing-columns"
  | "comparison-table"
  | "service-plans"
  | null;

interface BaseCardData {
  title: string;
  description: string;
  buttonText: string;
}

interface PricingCardData extends BaseCardData {
  type: "pricing-grid" | "pricing-columns";
  cards: {
    title: string;
    price: string;
    period: string;
    description: string;
    features: string[];
    buttonText: string;
    imageUrl?: string;
  }[];
}

// interface ComparisonTableData {
//   type: "comparison-table";
//   title: string;
//   plans: {
//     name: string;
//     price: string;
//     period: string;
//     features: Record<string, boolean>;
//   }[];
//   featuresList: string[];
// }

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
  type: "pricing-columns", // changed to columns to match your use case
  cards: [
    {
      title: "Standard Room",
      price: "$99",
      period: "/night",
      description: "1 full bed",
      imageUrl: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=500&fit=crop",
      features: [
        "Private Bathroom",
        "Mini Refrigerator",
        "Flat-screen TV",
        "In-Room Heating and A/C Controls",
        "High Speed Free WiFi",
      ],
      buttonText: "Book now",
    },
    {
      title: "Double Room",
      price: "$139",
      period: "/night",
      description: "2 full beds",
      imageUrl: "https://images.unsplash.com/photo-1598928506835-3e93ab8f5c5f?w=800&h=500&fit=crop",
      features: [
        "Private Bathroom",
        "Mini Refrigerator",
        "Flat-screen TV",
        "In-Room Heating and A/C Controls",
        "High Speed Free WiFi",
        "Iron and Ironing Board",
      ],
      buttonText: "Book now",
    },
    {
      title: "King Room",
      price: "$159",
      period: "/night",
      description: "1 king bed",
      imageUrl: "https://images.unsplash.com/photo-1611892441792-ae6af465f0c8?w=800&h=500&fit=crop",
      features: [
        "Private Bathroom",
        "Mini Refrigerator",
        "Flat-screen TV",
        "In-Room Heating and A/C Controls",
        "High Speed Free WiFi",
        "Iron and Ironing Board",
      ],
      buttonText: "Book now",
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
      imageUrl: "https://images.unsplash.com/photo-1557683316-973673baf926?w=400&h=300&fit=crop",
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
      imageUrl: "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=400&h=300&fit=crop",
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
      imageUrl: "https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?w=400&h=300&fit=crop",
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
      <div className="bg-white rounded overflow-hidden mb-3 aspect-[4/3] flex items-center justify-center p-2">
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
              <div className="flex gap-1 w-full justify-center">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="bg-gray-100 rounded p-2 flex-1 flex flex-col items-center"
                  >
                    <div className="w-8 h-8 bg-gray-300 rounded mb-1"></div>
                    <div className="w-full h-1 bg-gray-300 rounded mb-1"></div>
                    <div className="w-full h-1 bg-gray-200 rounded mb-1"></div>
                    <div className="w-full h-2 bg-blue-500 rounded"></div>
                  </div>
                ))}
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
      <div className="flex-1 bg-gray-800 p-12 overflow-auto">
        <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-2xl p-8">
          {selectedTemplate === "pricing-columns" && (
            <div className="grid grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="border-2 border-gray-200 rounded-xl p-6"
                >
                  <h3 className="text-xl font-bold mb-2">Plan {i}</h3>
                  <p className="text-gray-600 mb-4">Description here</p>
                  <div className="text-4xl font-bold text-blue-600 mb-4">
                    ${i * 10}
                  </div>
                  <button className="w-full bg-blue-600 text-white py-2 rounded-lg">
                    Get Started
                  </button>
                </div>
              ))}
            </div>
          )}
          {selectedTemplate === "comparison-table" && (
            <table className="w-full">
              <thead>
                <tr>
                  <th className="border p-3">Feature</th>
                  <th className="border p-3 bg-blue-50">Basic</th>
                  <th className="border p-3 bg-blue-50">Pro</th>
                  <th className="border p-3 bg-blue-50">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {["Feature 1", "Feature 2", "Feature 3"].map((f) => (
                  <tr key={f}>
                    <td className="border p-3">{f}</td>
                    <td className="border p-3 text-center text-green-500">✓</td>
                    <td className="border p-3 text-center text-green-500">✓</td>
                    <td className="border p-3 text-center text-gray-300">✗</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
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
                const plan = data.plans[editingPlanIndex];
                const index = editingPlanIndex;
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
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      Upload from PC
    </label>
  </div>

  <InputField
    label="Or paste Image URL"
    value={plan.imageUrl || ""}
    placeholder="https://images.unsplash.com/photo-..."
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
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  )}
</div>
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
                                    checked={plan.features[feature.name] as boolean}
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
            // COLLAPSED VIEW - Show all categories as clickable bars
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

  const handleCardChange = (
    index: number,
    field: "title" | "price" | "period" | "description" | "buttonText" | "imageUrl",
    value: string
  ) => {
    const newCards = [...data.cards];
    newCards[index] = {
      ...newCards[index],
      [field]: value || (field === "imageUrl" ? undefined : value),
    };
    onChange({ ...data, cards: newCards });
  };

  const handleFeatureChange = (
    cardIndex: number,
    featureIndex: number,
    value: string
  ) => {
    const newCards = [...data.cards];
    newCards[cardIndex].features[featureIndex] = value;
    onChange({ ...data, cards: newCards });
  };

  const handleRemoveFeature = (cardIndex: number, featureIndex: number) => {
    const newCards = [...data.cards];
    newCards[cardIndex].features = newCards[cardIndex].features.filter(
      (_, i) => i !== featureIndex
    );
    onChange({ ...data, cards: newCards });
  };

  const handleAddFeature = (cardIndex: number) => {
    const newCards = [...data.cards];
    newCards[cardIndex].features.push("New feature");
    onChange({ ...data, cards: newCards });
  };

  const handleAddCard = () => {
    onChange({
      ...data,
      cards: [
        ...data.cards,
        {
          title: "New Plan",
          price: "$0",
          period: "/month",
          description: "Description here",
          features: ["Feature 1"],
          buttonText: "Get Started",
        },
      ],
    });
  };

  const handleRemoveCard = (index: number) => {
    const newCards = data.cards.filter((_, i) => i !== index);
    onChange({ ...data, cards: newCards });
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
      {editingCardIndex === null ? (
        // COLLAPSED VIEW - Show all cards as clickable bars
        <>
          {data.cards.map((card, index) => (
            <div
              key={index}
              className="w-full mb-2 p-3 bg-gray-800 border border-gray-700 rounded-lg flex items-center justify-between hover:border-gray-600 transition-colors group"
            >
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
        // EXPANDED VIEW - Show editor for selected card
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
            const card = data.cards[editingCardIndex];
            const cardIndex = editingCardIndex;
            
            return (
              <div className="p-4 border border-gray-700 rounded-lg bg-gray-800">
                {/* ALL YOUR EXISTING EDITING FIELDS GO HERE */}
                <InputField
                  label="Plan Title"
                  value={card.title}
                  onChange={(value) => handleCardChange(cardIndex, "title", value)}
                />

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <InputField
                    label="Price"
                    value={card.price}
                    onChange={(value) => handleCardChange(cardIndex, "price", value)}
                  />
                  <InputField
                    label="Period"
                    value={card.period}
                    onChange={(value) => handleCardChange(cardIndex, "period", value)}
                  />
                </div>

                <div className="mt-4">
                  <InputField
                    label="Description"
                    value={card.description}
                    onChange={(value) => handleCardChange(cardIndex, "description", value)}
                  />
                </div>

                {/* Image Upload Section */}
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

                {/* Features Section */}
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Features
                  </label>
                  <div className="space-y-2">
                    {card.features.map((feature, featureIndex) => (
                      <FeatureItem
                        key={featureIndex}
                        value={feature}
                        onChange={(value) =>
                          handleFeatureChange(cardIndex, featureIndex, value)
                        }
                        onRemove={() =>
                          handleRemoveFeature(cardIndex, featureIndex)
                        }
                      />
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
                    onChange={(value) =>
                      handleCardChange(cardIndex, "buttonText", value)
                    }
                  />
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
};



const PricingCardPreview = ({ data }: { data: PricingCardData }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
    {data.cards.map((card, index) => (
      <div
        key={index}
        className="bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col border-2 border-gray-100 hover:border-gray-300 transition-all duration-300 hover:shadow-3xl"
      >
        {/* Image at the top */}
        {card.imageUrl ? (
          <div className="h-48 w-full overflow-hidden">
            <img
              src={card.imageUrl}
              alt={card.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
            />
            <div className="hidden w-full h-full bg-gray-200 border-2 border-dashed rounded-xl" />
          </div>
        ) : (
          <div className="h-48 bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center">
            <span className="text-gray-400 text-sm">No image</span>
          </div>
        )}

        {/* Card Content */}
        <div className="p-8 flex-1 flex flex-col">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-1">
              {card.title}
            </h3>
            <p className="text-gray-600 text-sm">{card.description}</p>
          </div>

          <div className="text-center mb-8">
            <span className="text-5xl font-bold text-blue-600">
              {card.price}
            </span>
            <span className="text-gray-600 text-lg">{card.period}</span>
          </div>

          <div className="flex-1">
            <ul className="space-y-3 text-left text-gray-700">
              {card.features.map((feature, i) => (
                <li key={i} className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105">
              {card.buttonText}
            </button>
            <p className="text-center text-xs text-gray-500 mt-3">
              No booking or credit card fees!
            </p>
          </div>
        </div>
      </div>
    ))}
  </div>
);

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
  const [activeTab, setActiveTab] = useState<"content" | "appearance">(
    "content"
  );

  return (
    <div className="flex-1 bg-gray-900 flex overflow-hidden">
      {/* Left Sidebar - Editor */}
      <div className="w-96 bg-gray-950 flex flex-col">
        {/* Tabs */}
        <div className="flex border-b border-gray-800">
          <button
            onClick={() => setActiveTab("content")}
            className={`flex-1 px-4 py-3 flex items-center justify-center gap-2 ${activeTab === "content"
              ? "bg-gray-900 text-white"
              : "text-gray-400 hover:text-white"
              }`}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
            </svg>
            Content
          </button>
          <button
            onClick={() => setActiveTab("appearance")}
            className={`flex-1 px-4 py-3 flex items-center justify-center gap-2 ${activeTab === "appearance"
              ? "bg-gray-900 text-white"
              : "text-gray-400 hover:text-white"
              }`}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4z"
                clipRule="evenodd"
              />
            </svg>
            Appearance
          </button>
        </div>

        {/* Editor Content */}
        <div
          className="flex-1 overflow-y-auto p-6 
            [&::-webkit-scrollbar]:w-2
            [&::-webkit-scrollbar-track]:bg-gray-700
            [&::-webkit-scrollbar-track]:rounded-full
            [&::-webkit-scrollbar-track]:shadow-inner
            [&::-webkit-scrollbar-thumb]:bg-gray-500
            [&::-webkit-scrollbar-thumb]:hover:bg-gray-400
            [&::-webkit-scrollbar-thumb]:rounded-full
            [&::-webkit-scrollbar-thumb]:border-2 
            [&::-webkit-scrollbar-thumb]:border-gray-700"
        >
          {activeTab === "content" && (
            <div>
              <h2 className="text-white text-xl font-semibold mb-6">Content</h2>
              {(editorData.type === "pricing-grid" ||
                editorData.type === "pricing-columns") && (
                  <PricingCardEditor data={editorData} onChange={setEditorData} />
                )}
              {editorData.type === "comparison-table" && (
                <ComparisonTableEditor
                  data={editorData}
                  onChange={setEditorData}
                />
              )}
            </div>
          )}
          {activeTab === "appearance" && (
            <div className="text-gray-400">
              <h2 className="text-white text-xl font-semibold mb-6">
                Appearance
              </h2>
              <p>Appearance settings coming soon...</p>
            </div>
          )}
        </div>

        {/* Bottom Button */}
        {/* <div className="p-6 border-t border-gray-800">
          <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors">
            Add to website for free
          </button>
        </div> */}
      </div>

      {/* Right Side - Preview */}
      <div className="flex-1 bg-gray-800 p-12 overflow-auto">
        <div className="flex items-start justify-center pt-12">
          {(editorData.type === "pricing-grid" ||
            editorData.type === "pricing-columns") && (
              <PricingCardPreview data={editorData} />
            )}
          {editorData.type === "comparison-table" && (
            <ComparisonTablePreview data={editorData} />
          )}
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
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
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
