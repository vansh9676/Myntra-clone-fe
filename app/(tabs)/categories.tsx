import {
  StyleSheet,
  Image,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";

import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { Search, X } from "lucide-react-native";

const demoCategories = [
  {
    id: "1",
    name: "Men",
    subcategory: ["T-Shirts", "Shirts", "Jeans"],
    image:
      "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=500&auto=format&fit=crop",
    productId: [],
  },
  {
    id: "2",
    name: "Women",
    subcategory: ["Dresses", "Tops", "Ethnic Wear"],
    image:
      "https://images.unsplash.com/photo-1618244972963-dbad0c4abf18?w=500&auto=format&fit=crop",
    productId: [],
  },
  {
    id: "3",
    name: "Kids",
    subcategory: ["Boys", "Girls", "Toys"],
    image:
      "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=500&auto=format&fit=crop",
    productId: [],
  },
  {
    id: "4",
    name: "Beauty",
    subcategory: ["Makeup", "Skincare", "Haircare"],
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&auto=format&fit=crop",
    productId: [],
  },
];

export default function TabTwoScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setcategories] = useState<any>(null);

  useEffect(() => {
    setIsLoading(true);
    setcategories(demoCategories);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#ff3f6c" />
      </View>
    );
  }

  if (!categories) {
    return (
      <View style={styles.container}>
        <Text>Categories not found</Text>
      </View>
    );
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSelectedCategory(null);
    setSelectedSubcategory(null);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSelectedCategory(null);
    setSelectedSubcategory(null);
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedSubcategory(null);
    setSearchQuery("");
  };

  const handleSubcategorySelect = (subcategoryId: string) => {
    setSelectedSubcategory(subcategoryId);
    setSearchQuery("");
  };

  const filtercategories = categories?.filter((category: any) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedcategorydata = selectedCategory
    ? categories?.find((cat: any) => cat.id === selectedCategory)
    : null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Categories</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search categories"
            value={searchQuery}
            onChangeText={handleSearch}
          />
          {searchQuery !== "" && (
            <TouchableOpacity onPress={clearSearch}>
              <X size={20} color="#666" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView style={styles.content}>
        {!selectedCategory && (
          <View style={styles.categoriesGrid}>
            {filtercategories?.map((category: any) => (
              <TouchableOpacity
                key={category.id}
                style={styles.categoryCard}
                onPress={() => handleCategorySelect(category.id)}
              >
                <Image
                  source={{ uri: category.image }}
                  style={styles.categoryImage}
                />
                <View style={styles.categoryInfo}>
                  <Text style={styles.categoryName}>{category.name}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {selectedcategorydata && (
          <View style={styles.categoryDetail}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setSelectedCategory(null)}
            >
              <Text style={styles.backButtonText}>← Back</Text>
            </TouchableOpacity>

            <Text style={styles.categoryTitle}>
              {selectedcategorydata.name}
            </Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.subcategoriesScroll}
            >
              {selectedcategorydata.subcategory?.map(
                (sub: any, index: any) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.subcategoryButton,
                      selectedSubcategory === sub &&
                        styles.selectedSubcategory,
                    ]}
                    onPress={() => handleSubcategorySelect(sub)}
                  >
                    <Text
                      style={[
                        styles.subcategoryButtonText,
                        selectedSubcategory === sub &&
                          styles.selectedSubcategoryText,
                      ]}
                    >
                      {sub}
                    </Text>
                  </TouchableOpacity>
                )
              )}
            </ScrollView>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: { flex: 1, backgroundColor: "#fff" },
  header: { padding: 15, paddingTop: 50 },
  headerTitle: { fontSize: 24, fontWeight: "bold" },
  searchContainer: { padding: 15 },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    padding: 10,
  },
  searchInput: { flex: 1, marginLeft: 10 },
  content: { flex: 1 },
  categoriesGrid: { padding: 15 },
  categoryCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 15,
    elevation: 5,
    overflow: "hidden",
  },
  categoryImage: { width: "100%", height: 150 },
  categoryInfo: { padding: 15 },
  categoryName: { fontSize: 18, fontWeight: "bold" },
  categoryDetail: { padding: 15 },
  backButton: { marginBottom: 10 },
  backButtonText: { color: "#ff3f6c", fontSize: 16 },
  categoryTitle: { fontSize: 24, fontWeight: "bold" },
  subcategoriesScroll: { marginVertical: 15 },
  subcategoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
    marginRight: 10,
  },
  selectedSubcategory: { backgroundColor: "#ff3f6c" },
  subcategoryButtonText: { color: "#333" },
  selectedSubcategoryText: { color: "#fff" },
});