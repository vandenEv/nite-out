import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import { db } from "../firebaseConfig";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { useGamer } from "../contexts/GamerContext";
import { SafeAreaView } from "react-native-safe-area-context";
import profileIcons from "../utils/profileIcons/profileIcons";
import { SvgXml } from "react-native-svg";
import * as Clipboard from "expo-clipboard";

const GameDetails = ({ route, navigation }) => {
  const { game } = route.params;
  const { gamerId } = useGamer();
  const [host, setHost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hostProfileXml, setHostProfileXml] = useState(null);
  const [owner, setOwner] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [gameCode, setGameCode] = useState("");

  const start_date = new Date(game.start_time);
  const end_date = new Date(game.end_time);
  const start_time = start_date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const end_time = end_date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const participants = Array.isArray(game.participants)
    ? game.participants
    : [];
  const availableSeats = game.max_players - participants.length;

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });

    const getOrdinalSuffix = (n) => {
      if (n >= 11 && n <= 13) return "th";
      switch (n % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };

    return `${month} ${day}${getOrdinalSuffix(day)}`;
  };
  const formattedDate = formatDate(start_date);

  useEffect(() => {
    console.log("game host:", game.host);
    const fetchHost = async () => {
      try {
        const hostDoc = await getDoc(doc(db, "gamers", game.host));
        if (hostDoc.exists()) {
          const hostData = hostDoc.data();
          console.log("Host data:", hostData);
          setHost(hostData);
          const hostProfileXml = profileIcons[hostData.profile];
          setHostProfileXml(hostProfileXml);
          if (game.host === gamerId) {
            setOwner(true);
          }
        } else {
          console.error("Host data not found");
        }
      } catch (error) {
        console.error("Error fetching host data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHost();
  }, [game.host]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00B4D8" />
      </View>
    );
  }

  const handleReserveSeat = async () => {
    try {
      // Proceed with reservation
      await updateDoc(doc(db, "games", game.id), {
        participants: arrayUnion(gamerId),
      });
      await updateDoc(doc(db, "gamers", gamerId), {
        joined_games: arrayUnion(game.id),
      });
      alert("Reservation confirmed!");
    } catch (error) {
      console.error("Error reserving seat:", error);
      alert("Failed to reserve seat. Please try again.");
    }
  };

  const handleShowCode = async () => {
    try {
      if (!game?.id) {
        console.warn("Missing game.id");
        return;
      }
      const gameRef = doc(db, "games", game.id);
      const gameSnap = await getDoc(gameRef);
      if (gameSnap.exists()) {
        const data = gameSnap.data();
        const code = data.game_code || "----";
        console.log("Fetched gameCode:", code);
        setGameCode(code);
        setShowCode(true);
      } else {
        console.warn("Game not found in Firestore");
      }
    } catch (error) {
      console.error("Error fetching game code:", error);
    }
  };

  const copyToClipboard = () => {
    Clipboard.setStringAsync(gameCode);
    Alert.alert("Copied!", "Game code has been copied to clipboard.");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={30} color="#00B4D8" />
        </TouchableOpacity>
        <Text style={styles.title}>{game.game_name}</Text>
      </View>

      {/* Event Details Container */}
      <View style={styles.detailsContainer}>
        <View style={styles.leftContainer}>
          {/* Pub Name */}
          <Text style={styles.pubName}>{game.location}</Text>
          {/* Game Organizer */}
          <Text style={styles.hostText}>Hosted by</Text>
          <View style={styles.organizerContainer}>
            <SvgXml xml={hostProfileXml} width={40} height={40} />
            <Text style={styles.organizerName}>
              {host ? `${host.fullName}${owner ? " (You)" : ""}` : ""}
            </Text>
          </View>
          <Text style={styles.hostText}>Description</Text>
          <Text style={styles.descriptionText}>{game.game_desc}</Text>
        </View>
      </View>

      {/* Info Container with Date/Time and Spots Remaining */}
      <View style={styles.infoContainer}>
        <View style={styles.pill}>
          <Text style={styles.dateTimePillText}>{formattedDate}</Text>
          <Text style={styles.dateTimePillText}>
            {start_time} - {end_time}
          </Text>
        </View>
        <View style={styles.pill}>
          <Text style={styles.pillText}>{availableSeats} spots left</Text>
        </View>
      </View>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: parseFloat(game.xcoord),
          longitude: parseFloat(game.ycoord),
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={{
            latitude: parseFloat(game.xcoord),
            longitude: parseFloat(game.ycoord),
          }}
          title={game.location}
          description="Game Location"
        />
      </MapView>

      {/* Join Event Button */}
      <TouchableOpacity
        style={styles.reserveButton}
        onPress={
          owner
            ? handleShowCode
            : () =>
                Alert.alert(
                  "Join Event",
                  "Are you sure you want to join this event?",
                  [
                    { text: "Cancel", style: "destructive" },
                    { text: "Join", onPress: () => handleReserveSeat() },
                  ]
                )
        }
      >
        <Text style={styles.reserveButtonText}>
          {owner ? "Share Code" : "Join Event"}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={showCode}
        transparent
        animationType="fade"
        onRequestClose={() => setShowCode(false)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "#90E0EF",
              padding: 30,
              borderRadius: 20,
              alignItems: "center",
              width: "80%",
            }}
          >
            <Text
              style={{ fontSize: 22, fontWeight: "bold", marginBottom: 10 }}
            >
              Your Game Code
            </Text>
            <Text
              style={{
                fontSize: 40,
                backgroundColor: "#ffff",
                color: "#00B4D8",
                paddingHorizontal: 25,
                paddingVertical: 7,
                borderRadius: 26,
                marginBottom: 20,
              }}
            >
              {gameCode}
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: "#FF006E",
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  borderRadius: 15,
                  flex: 1,
                  marginRight: 10,
                }}
                onPress={copyToClipboard}
              >
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 16,
                    textAlign: "center",
                  }}
                >
                  Copy
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: "#FF006E",
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  borderRadius: 15,
                  flex: 1,
                  marginLeft: 10,
                }}
                onPress={() => setShowCode(false)}
              >
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 16,
                    textAlign: "center",
                  }}
                >
                  Close
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#90E0EF",
    justifyContent: "flex-start",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: 10,
    position: "relative",
  },
  backButton: {
    position: "absolute",
    left: 12,
    color: "#FF006E",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  detailsContainer: {
    flexDirection: "row",
    padding: 20,
    margin: 10,
    backgroundColor: "#FFFF",
    borderRadius: 20,
    alignItems: "center",
  },
  leftContainer: {
    flex: 1,
    marginRight: 0,
    width: "100%",
  },
  pubName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#FF006E",
  },
  organizerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  organizerName: {
    fontSize: 18,
    marginLeft: 10,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  pill: {
    backgroundColor: "#00B4D8",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginBottom: 10,
    alignSelf: "flex-start",
    width: "48%",
  },
  dateTimePillText: {
    color: "white",
    fontSize: 14,
    textAlign: "center",
  },
  pillText: {
    color: "white",
    fontSize: 27,
    textAlign: "center",
  },
  imageContainer: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  eventImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  map: {
    width: "95%",
    height: 200,
    borderRadius: 20,
    paddingBottom: 0,
    alignSelf: "center",
  },
  reserveButton: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    backgroundColor: "#FF006E",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 20,
    width: "90%",
    marginBottom: 20,
  },
  reserveButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  cancelText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  descriptionText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "left",
    width: "100%",
  },
  hostText: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "left",
    width: "100%",
    color: "#00B4D8",
  },
});

export default GameDetails;
