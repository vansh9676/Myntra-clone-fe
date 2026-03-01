import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { Search, ChevronRight } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Platform } from "react-native";
import { getRecentlyViewed } from "@/utils/recentlyViewed";
import { demoProducts } from "@/constants/products";

const demoCategories = [
  {
    id: 1,
    name: "Men",
    image:
      "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=500&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Women",
    image:
      "https://images.unsplash.com/photo-1618244972963-dbad0c4abf18?w=500&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Kids",
    image:
      "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=500&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Beauty",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&auto=format&fit=crop",
  },
];

// const demoProducts = [
//   {
//     id: 1,
//     name: "Casual White T-Shirt",
//     brand: "Roadster",
//     price: "₹499",
//     discount: "60% OFF",
//     image:
//       "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format&fit=crop",
//   },
//   {
//     id: 2,
//     name: "Denim Jacket",
//     brand: "Levis",
//     price: "₹2499",
//     discount: "40% OFF",
//     image:
//       "https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?w=500&auto=format&fit=crop",
//   },
//   {
//     id: 3,
//     name: "Summer Dress",
//     brand: "ONLY",
//     price: "₹1299",
//     discount: "50% OFF",
//     image:
//       "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&auto=format&fit=crop",
//   },
//   {
//     id: 4,
//     name: "Classic Sneakers",
//     brand: "Nike",
//     price: "₹3499",
//     discount: "30% OFF",
//     image:
//       "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop",
//   },
// ];

const deals = [
  {
    id: 1,
    title: "Under ₹599",
    image:
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "40-70% Off",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&auto=format&fit=crop",
  },
];

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [product, setproduct] = useState<any>(null);
  const [categories, setcategories] = useState<any>(null);
  const { user } = useAuth();
  const [recentProducts, setRecentProducts] = useState<any[]>([]);

  const handleProductPress = (productId: number) => {
  router.push(`/product/${productId}`);
};

 useEffect(() => {
  const loadData = async () => {
    setIsLoading(true);

    setcategories(demoCategories);
    setproduct(demoProducts);

    // ✅ Load recently viewed
    const recent = await getRecentlyViewed();
    setRecentProducts(recent);

    setIsLoading(false);
  };

  loadData();
}, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>MYNTRA</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Search size={24} color="#3e3e3e" />
        </TouchableOpacity>
      </View>

      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&auto=format&fit=crop",
        }}
        style={styles.banner}
      />

      <View style={styles.section}>
        <View style={styles.rsectionHeader}>
          <Text style={styles.sectionTitle}>SHOP BY CATEGORY</Text>
          <TouchableOpacity style={styles.viewAll}>
            <Text style={styles.viewAllText}>View All</Text>
            <ChevronRight size={20} color="#ff3f6c" />
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {isLoading ? (
            <ActivityIndicator size="large" color="#ff3f6c" />
          ) : (
            categories?.map((category: any) => (
              <TouchableOpacity key={category.id} style={styles.categoryCard}>
                <Image
                  source={{ uri: category.image }}
                  style={styles.categoryImage}
                />
                <Text style={styles.categoryName}>{category.name}</Text>
              </TouchableOpacity>
            ))
          )}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>DEALS OF THE DAY</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {deals.map((deal) => (
            <TouchableOpacity key={deal.id} style={styles.dealCard}>
              <Image source={{ uri: deal.image }} style={styles.dealImage} />
              <View style={styles.dealOverlay}>
                <Text style={styles.dealTitle}>{deal.title}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      {recentProducts.length > 0 && (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>RECENTLY VIEWED</Text>

    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {recentProducts.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={{ marginRight: 12 }}
          onPress={() => handleProductPress(item.id)}
        >
          <Image
             source={{ uri: item.image || item.images?.[0] }} 
              style={{
              width: 120,
              height: 120,
              borderRadius: 10,
              marginBottom: 5,
            }}
          />
          <Text style={{ width: 120 }} numberOfLines={1}>
            {item.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  </View>
)}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>TRENDING NOW</Text>

        <View style={styles.productsGrid}>
          {isLoading ? (
            <ActivityIndicator size="large" color="#ff3f6c" />
          ) : (
            product?.map((item: any) => (
              <TouchableOpacity
                key={item.id}
                style={styles.productCard}
                onPress={() => handleProductPress(item.id)}
              >
                <Image
                  source={{ uri: item.image }}
                  style={styles.productImage}
                />
                <View style={styles.productInfo}>
                  <Text style={styles.brandName}>{item.brand}</Text>
                  <Text style={styles.productName}>{item.name}</Text>
                  <View style={styles.priceRow}>
                    <Text style={styles.productPrice}>{item.price}</Text>
                    <Text style={styles.discount}>{item.discount}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
  backgroundColor: "#fff",
  maxWidth: 1200,
  alignSelf: "center",
  width: "100%",
},
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    paddingTop: 50,
  },
  logo: { fontSize: 24, fontWeight: "bold", color: "#3e3e3e" },
  searchButton: { padding: 8 },
  banner: { width: "100%", height: 200 },
  section: { padding: 15 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  categoryCard: { width: 100, marginRight: 10 },
  categoryImage: { width: 100, height: 100, borderRadius: 50 },
  categoryName: { textAlign: "center", marginTop: 8 },
  dealCard: { width: 280, height: 150, marginRight: 10, borderRadius: 10 },
  dealImage: { width: "100%", height: "100%" },
  dealOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 10,
  },
  dealTitle: { color: "#fff", fontSize: 16, fontWeight: "bold" },
productsGrid: {
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
},  productCard: {
  width: Platform.OS === "web" ? "23%" : "48%",
  marginBottom: 15,
  backgroundColor: "#fff",
  borderRadius: 10,
  elevation: 5,
},
  productImage: {
  width: "100%",
  aspectRatio: 1,
  borderTopLeftRadius: 10,
  borderTopRightRadius: 10,
},
  productInfo: { padding: 10 },
  brandName: { fontSize: 14, color: "#666" },
  productName: { fontSize: 16 },
  priceRow: { flexDirection: "row", alignItems: "center" },
  productPrice: { fontWeight: "bold", marginRight: 5 },
  discount: { color: "#ff3f6c" },
});