import React from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";

const TermsAndConditionsScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
 
      <View style={styles.contentContainer}>
        <Text style={styles.contentText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at odio libero. Proin eu leo eleifend,
          euismod mi et, pharetra lectus. Vestibulum malesuada feugiat luctus. Vestibulum venenatis luctus dictum. Proin
          ut ullamcorper eros. Sed eleifend, nisl vel lacinia malesuada, augue sapien efficitur metus, ut mattis ex urna
          at mi. Curabitur a tristique tortor, eget egestas elit. Aliquam ac arcu quis odio rhoncus posuere at vitae
          eros. Nullam tristique eros quis libero ullamcorper, ut ullamcorper sem fringilla. Quisque viverra nisi nec
          pellentesque sodales.
        </Text>
        <Text style={styles.contentText}>
          Sed blandit vel tellus ut suscipit. Cras et suscipit sapien, sit amet placerat mauris. Fusce lacinia
          ullamcorper dapibus. Etiam auctor, purus vel varius gravida, ligula justo sodales risus, non eleifend turpis
          sapien in sem. Suspendisse blandit tristique malesuada. Etiam vestibulum sem eget fermentum tempor. Ut dapibus
          sapien a libero interdum efficitur. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere
          cubilia Curae; Etiam ultrices vehicula quam vel tempor.
        </Text>
        <Text style={styles.contentText}>
          Nullam vel mi a erat aliquet dignissim. Sed eu arcu rutrum, convallis erat vel, pharetra massa. Vivamus tempus
          elit et ex varius iaculis. Vestibulum semper auctor turpis, nec accumsan mauris volutpat non. Morbi
          consectetur augue non dui suscipit, nec euismod quam fringilla. Sed id leo fringilla, congue risus non,
          malesuada ligula. Ut dapibus mi ac ullamcorper tristique. Morbi fringilla fringilla nisl vitae pulvinar.
          Suspendisse faucibus blandit ipsum a consectetur. Nam iaculis vel enim sit amet suscipit.
        </Text>
        <Text style={styles.contentText}>
          Nullam vel mi a erat aliquet dignissim. Sed eu arcu rutrum, convallis erat vel, pharetra massa. Vivamus tempus
          elit et ex varius iaculis. Vestibulum semper auctor turpis, nec accumsan mauris volutpat non. Morbi
          consectetur augue non dui suscipit, nec euismod quam fringilla. Sed id leo fringilla, congue risus non,
          malesuada ligula. Ut dapibus mi ac ullamcorper tristique. Morbi fringilla fringilla nisl vitae pulvinar.
          Suspendisse faucibus blandit ipsum a consectetur. Nam iaculis vel enim sit amet suscipit.
        </Text>
        <Text style={styles.contentText}>
          Nullam vel mi a erat aliquet dignissim. Sed eu arcu rutrum, convallis erat vel, pharetra massa. Vivamus tempus
          elit et ex varius iaculis. Vestibulum semper auctor turpis, nec accumsan mauris volutpat non. Morbi
          consectetur augue non dui suscipit, nec euismod quam fringilla. Sed id leo fringilla, congue risus non,
          malesuada ligula. Ut dapibus mi ac ullamcorper tristique. Morbi fringilla fringilla nisl vitae pulvinar.
          Suspendisse faucibus blandit ipsum a consectetur. Nam iaculis vel enim sit amet suscipit.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  contentContainer: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
  },
  contentText: {
    marginBottom: 16,
  },
});

export default TermsAndConditionsScreen;
