import { ArrowLeft, ImagePlus, X } from "lucide-react";
import React, { useState } from "react";
import { databases, ID, storage } from "../../lib/appwrite";
import { config } from "../../lib/env";
import { useUser } from "../../store";
import toast from "react-hot-toast";

// Handle file input change
interface ImageChangeEvent extends React.ChangeEvent<HTMLInputElement> {
  target: HTMLInputElement & { files: FileList };
}

interface CommunityForm {
  name: null | string;
  websiteLink: null | string;
  description: null | string;
  Category: null | string[];
  blockchain: null | string;
  thumbnail_url: null | string;
}
function CreateProject() {
  const { user } = useUser();
  const [image, setImage] = useState<File | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [projectId, setProjectId] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [inputValue, setInputValue] = useState(""); // Input field value
  const [communityForm, setCommunityForm] = useState<CommunityForm>({
    name: null,
    websiteLink: null,
    description: null,
    Category: null,
    blockchain: null,
    thumbnail_url: null,
  });

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // Handle "Enter" key press to add a category
  const handleKeyDown = (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    if ("key" in e && e.key === "Enter" && inputValue) {
      e.preventDefault();
      setCategories((prevCategories) => [...prevCategories, inputValue]);
      setInputValue("");
    }
  };

  // Remove a category from the array
  const removeCategory = (index: number) => {
    const newCategories = categories.filter((_, i) => i !== index);
    setCategories(newCategories);
  };

  const handleFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    // Update the corresponding field in the state
    setCommunityForm((prevForm) => ({
      ...prevForm,
      [name]: value, // Dynamically update the field based on the input's name
    }));
  };

  const handleImageChange = (event: ImageChangeEvent): void => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setImageURL(URL.createObjectURL(file)); // Create a URL for the uploaded file
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.loading("Creating community...");

    const uniqueId = ID.unique(); // Generate ID once
    setCommunityForm((prev) => ({ ...prev, thumbnail_url: uniqueId }));
    setProjectId(uniqueId);

    try {
      if (!image) throw new Error("Image file is required");

      // Ensure state is updated before proceeding
      await storage.createFile(config.projectProfilebucketId, uniqueId, image);

      await databases.createDocument(
        config.databaseId,
        config.projectCollectinId,
        uniqueId,
        {
          admin_id: user?.$id,
          project_name: communityForm.name,
          description: communityForm.description,
          category: categories,
          thumbnail_url: uniqueId,
          Links: communityForm.websiteLink,
        }
      );

      await databases.createDocument(
        config.databaseId,
        config.userProjectsCollectionId,
        ID.unique(),
        {
          user_project_id: projectId,
          user_id: user?.$id,
          role: "admin",
        }
      );

      // Reset form correctly
      setCommunityForm({
        name: "",
        websiteLink: "",
        description: "",
        Category: null,
        blockchain: "",
        thumbnail_url: "",
      });

      toast.dismiss();
      toast.success("Community created successfully! 🎉");
    } catch (error: unknown) {
      console.error("Submission Error:", error);
      toast.dismiss();
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    }
  };

  return (
    <div className="flex flex-row w-full h-screen relative">
      <div className="flex-[2_2_0%] p-8 flex flex-col gap-5 relative h-full overflow-auto">
        <div className="flex relative pt-3 items-center justify-between">
          <button className="text-text-color p-2 rounded-lg border-2 border-border-color">
            <ArrowLeft className="text-text-secondary-color" />
          </button>
          <span className="logo-text text-text-color font-medium font-patriot text-2xl">
            QuestIQ
          </span>
        </div>
        <span className="text-lg text-text-color font-neue font-medium">
          Create your Community
        </span>
        <form onSubmit={handleSubmit} className="w-full h-full">
          <div className="w-full flex flex-row gap-5">
            <div
              className="border-2 relative 
           bg-secondary-color rounded-lg h-40 border-border-color w-full max-w-40 hover:border-accent-color transition-all cursor-pointer p-2"
            >
              <label className=" w-full h-full" htmlFor="image-upload">
                {imageURL ? (
                  <img
                    src={imageURL}
                    alt="Uploaded"
                    className="w-full h-full object-cover rounded-md"
                  />
                ) : (
                  <ImagePlus
                    size={30}
                    className="stroke-border-color absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  />
                )}
              </label>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden w-full h-full"
              />
            </div>
            <div className="flex flex-col gap-1 w-full font-neue">
              <label
                className="text-text-color text-sm font-medium"
                htmlFor="communityName"
              >
                Community name
              </label>
              <input
                className="bg-secondary-color placeholder:text-text-secondary-color text-text-color p-2 border-2 border-border-color rounded-md outline-none  autofill:bg-background-color autofill:border-none  focus:outline-accent-color focus:ring-0"
                type="text"
                name="name"
                value={communityForm.name || ""}
                id="communityName"
                placeholder="e.g project name"
                onChange={handleFormChange}
              />
            </div>
          </div>
          <span className="text-text-secondary-color font-neue text-sm font-medium">
            Recommended size is 256x256px
          </span>
          <div className="flex-col flex gap-4 pt-4">
            <div className="flex flex-col gap-1 w-full font-neue">
              <label
                className="capitalize font-medium text-text-color text-sm"
                htmlFor="communityWebsite"
              >
                website link
              </label>
              <input
                className="bg-secondary-color placeholder:text-text-secondary-color text-text-color p-2 border-2 border-border-color rounded-md outline-none  autofill:bg-background-color autofill:border-none  focus:outline-accent-color focus:ring-0"
                type="text"
                name="websiteLink"
                value={communityForm.websiteLink || ""}
                onChange={handleFormChange}
                id="communityWebsite"
                placeholder="e.g project website link"
              />
            </div>
            <div className="flex flex-col gap-1 w-full font-neue">
              <label
                className="capitalize font-medium text-text-color text-sm"
                htmlFor="communityDescription"
              >
                project description
              </label>
              <textarea
                className="bg-secondary-color placeholder:text-text-secondary-color text-text-color p-2 border-2 border-border-color rounded-md outline-none  autofill:bg-background-color autofill:border-none  focus:outline-accent-color focus:ring-0 h-[150px]"
                name="description"
                value={communityForm.description || ""}
                onChange={handleFormChange}
                id="communityDescription"
                placeholder="e.g project description"
              />
            </div>
            <div className="flex flex-col gap-1 w-full font-neue">
              <span className="flex flex-row items-center justify-between">
                <label
                  className="capitalize font-medium text-text-color text-sm"
                  htmlFor="communityCategory"
                >
                  project Category
                </label>
                <span className="text-text-secondary-color font-neue  font-medium capitalize">
                  optional
                </span>
              </span>
              {/* Input field for adding new categories */}
              <input
                type="text"
                value={inputValue}
                onChange={(e) => handleInputChange(e)}
                onKeyDown={(e) => handleKeyDown(e)}
                placeholder="add elements here"
                className="text-text-color rounded-lg focus:outline-none   placeholder:text-sm placeholder:text-text-secondary-color autofill:bg-background-color autofill:border-none  focus:outline-accent-color focus:ring-0 p-2 border-2 bg-secondary-color border-border-color "
              />
              {/* Display categories as tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {categories &&
                  categories?.map((category, index) => (
                    <div
                      key={category}
                      className="flex items-center bg-background-color text-text-color rounded-md px-3 py-2 text-sm  capitalize border border-border-color "
                    >
                      {category}
                      <button
                        onClick={() => removeCategory(index)}
                        className="ml-2 text-border-color hover:text-accent-color"
                      >
                        <X strokeWidth={1} />
                      </button>
                    </div>
                  ))}
              </div>
            </div>
            <div className="flex flex-col gap-1 w-full font-neue pb-20">
              <span className="flex flex-row items-center justify-between">
                <label
                  className="capitalize font-medium text-text-color text-sm"
                  htmlFor="communityBlockchain"
                >
                  Blockchain
                </label>
                <span className="text-text-secondary-color font-neue  font-medium capitalize">
                  optional
                </span>
              </span>
              <select
                name="blockchain"
                id="communityBlockchain"
                className="bg-secondary-color placeholder:text-text-secondary-color text-text-color p-2 border-2 border-border-color rounded-md outline-none  autofill:bg-background-color autofill:border-none  focus:outline-accent-color"
                value={communityForm.blockchain || ""}
                onChange={handleFormChange}
              >
                <option value="sfjhdk">sdfkdhj</option>
                <option value="sfjhdk">sdfkdhj</option>
                <option value="sfjhdk">sdfkdhj</option>
              </select>
            </div>
          </div>
          <div className="sticky bottom-0 right-0 w-full ">
            <button
              type="submit"
              className="p-3 w-full text-text-color font-neue capitalize font-medium bg-accent-color border-2 border-border-color rounded-lg"
            >
              create community
            </button>
          </div>
        </form>
      </div>
      <div className="flex-[3_3_0%] bg-primary hidden md:grid items-center justify-center overflow-hidden bg-accent-color"></div>
    </div>
  );
}

export default CreateProject;
