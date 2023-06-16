import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const PrivacyPolicyScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Privacy Policy</Text>
      <Text style={styles.sectionTitle}>1. Information We Collect</Text>
      <Text style={styles.paragraph}>When you use our app, we may collect the following types of information:</Text>
      <Text style={styles.bulletPoint}>
        - Personal Information: We may collect personal information that you voluntarily provide to us, such as your
        name, email address, and other contact information when you sign up for an account, contact us, or use certain
        features of the app.
      </Text>
      <Text style={styles.bulletPoint}>
        - Usage Information: We may automatically collect certain information about how you use our app, such as your IP
        address, device information (including device type, operating system version, and unique device identifier), and
        usage patterns, including the pages or screens you visit, the features you use, and the actions you take within
        the app.
      </Text>
      <Text style={styles.bulletPoint}>
        - Cookies: We may use cookies or similar tracking technologies to collect information about your app usage and
        preferences. You can disable cookies in your browser settings, but please note that some features of the app may
        not function properly if cookies are disabled.
      </Text>
      <Text style={styles.sectionTitle}>2. How We Use Your Information</Text>
      <Text style={styles.paragraph}>We may use the information we collect for the following purposes:</Text>
      <Text style={styles.bulletPoint}>
        - To provide and improve our app: We may use your personal and usage information to operate, maintain, and
        improve our app, including to personalize your experience, troubleshoot technical issues, and analyze usage
        trends.
      </Text>
      <Text style={styles.bulletPoint}>
        - To communicate with you: We may use your contact information to send you important notices, updates, and
        promotional messages about our app and services.
      </Text>
      <Text style={styles.bulletPoint}>
        - To respond to your inquiries: If you contact us with questions or feedback, we may use your personal
        information to respond to your inquiries and provide customer support.
      </Text>
      <Text style={styles.sectionTitle}>3. How We Share Your Information</Text>
      <Text style={styles.paragraph}>
        We may share your personal information with the following types of third parties:
      </Text>
      <Text style={styles.bulletPoint}>
        - Service Providers: We may share your information with third-party service providers who help us operate,
        maintain, and improve our app, such as hosting providers, analytics providers, and customer support providers.
      </Text>
      <Text style={styles.bulletPoint}>
        - Legal Requirements: We may disclose your information to comply with applicable laws, regulations, legal
        processes, or governmental requests, or to protect our rights, property, and safety or the rights, property, and
        safety of our users or others.
      </Text>
      <Text style={styles.bulletPoint}>
        - Business Transfers: If we are involved in a merger, acquisition, or sale of all or a portion of our assets,
        your information may be transferred as part of that transaction.
      </Text>
      <Text style={styles.sectionTitle}>4. Security</Text>
      <Text style={styles.paragraph}>
        We take reasonable measures to protect the confidentiality and security of your personal information.
      </Text>
      <View style={{margin:100}}/>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 16,
  },
  paragraph: {
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    marginBottom: 16,
  },
});

export default PrivacyPolicyScreen;
