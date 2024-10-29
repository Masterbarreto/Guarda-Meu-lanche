import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#211D1D',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFA000',
    marginBottom: 16,
  },
  estimatedTimeContainer: {
    marginBottom: 24,
    alignItems: 'center',
  },
  estimatedTime: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 4,
  },
  estimatedTimeLabel: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  timeline: {
    marginBottom: 32,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  markerContainer: {
    alignItems: 'center',
    marginRight: 16,
  },
  timelineMarkerConfirmed: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFC107',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  timelineMarkerDelivered: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#888',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  timelineText: {
    fontSize: 16,
    color: '#fff',
    marginLeft: -9,
    marginTop: -60, // Ajuste para subir o texto
  },
  timelineTime: {
    fontSize: 16,
    color: '#fff',
    marginLeft: -80,
    marginTop: -10, // Ajuste para subir o texto
  },
  timelineTime1: {
    fontSize: 16,
    color: '#fff',
    marginLeft: -60,
    marginTop: -10, // Ajuste para subir o texto
  },
  timelineTime2: {
    fontSize: 16,
    color: '#fff',
    marginLeft: -80,
    marginTop: -10, // Ajuste para subir o texto
  },
  timelineTime3: {
    fontSize: 16,
    color: '#fff',
    marginLeft: -70,
    marginTop: -10, // Ajuste para subir o texto
  },
  statusBarVertical: {
    width: 2,
    height: 50,
    backgroundColor: '#9C9990',
  },
  statusBar: {
    height: 1,
    backgroundColor: '#9C9990',
    marginBottom: 20,
  },
  button: {
    width: 108,
    height: 34,
    flexShrink: 0,
    borderRadius: 14,
    backgroundColor: '#FFB603',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#333333',
    fontSize: 14,
    fontWeight: 'bold',
  },
  cupertinoFooter1: {
    marginTop: 70,
  },
});

export default styles;
