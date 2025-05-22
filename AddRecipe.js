import { addDoc, collection, doc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ScreenLayout from '../components/ui/ScreenLayout';
import { db } from '../firebase/firebaseService';

export default function AddRecipe({ route, navigation }) {
  const { recipeId } = route.params || {};

  const [mainTimer, setMainTimer] = useState(0);
  const [mainRunning, setMainRunning] = useState(false);

  const [phases, setPhases] = useState([
    { id: 1, title: 'Phase 1', timer: 0, running: false },
    { id: 2, title: 'Phase 2', timer: 0, running: false }
    // Add more phases or dynamically fetch from recipe doc
  ]);

  // Single interval to update main + phases
  useEffect(() => {
    const interval = setInterval(() => {
      if (mainRunning) {
        setMainTimer(t => t + 1);
      }
      setPhases(old =>
        old.map(phase =>
          phase.running ? { ...phase, timer: phase.timer + 1 } : phase
        )
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [mainRunning]);

  function handleMainStart() {
    setMainRunning(true);
  }
  function handleMainPause() {
    setMainRunning(false);
  }
  function handleCancel() {
    setMainRunning(false);
    setMainTimer(0);
    setPhases(old => old.map(p => ({ ...p, timer: 0, running: false })));
  }

  function togglePhase(id) {
    setPhases(old =>
      old.map(phase =>
        phase.id === id ? { ...phase, running: !phase.running } : phase
      )
    );
  }

  function handleFinish() {
    setMainRunning(false);
    Alert.prompt('Batch Complete', 'How many products did you make?', async (val) => {
      const yieldCount = parseInt(val) || 0;
      const recipeRef = doc(db, 'recipes', recipeId);
      await addDoc(collection(recipeRef, 'batches'), {
        timestamp: Date.now(),
        totalTime: mainTimer,
        yield: yieldCount,
        phases: phases.map(p => ({
          id: p.id,
          title: p.title,
          time: p.timer
        }))
      });
      // reset
      setMainTimer(0);
      setPhases(old => old.map(p => ({ ...p, timer: 0, running: false })));
      navigation.goBack();
    });
  }

  return (
    <ScreenLayout title="Production">
      <View style={styles.container}>
        <Text style={styles.title}>Main Batch Timer: {mainTimer}s</Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.btn} onPress={handleMainStart}>
            <Text style={styles.btnTxt}>Start Main</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={handleMainPause}>
            <Text style={styles.btnTxt}>Pause Main</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnCancel} onPress={handleCancel}>
            <Text style={styles.btnTxt}>Cancel</Text>
          </TouchableOpacity>
        </View>

        {phases.map((phase) => (
          <View key={phase.id} style={styles.phaseCard}>
            <Text style={styles.phaseTitle}>
              {phase.title}: {phase.timer}s
            </Text>
            <TouchableOpacity
              style={styles.btnPhase}
              onPress={() => togglePhase(phase.id)}
            >
              <Text style={styles.btnPhaseTxt}>
                {phase.running ? 'Pause Phase' : 'Start Phase'}
              </Text>
            </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity style={styles.finishBtn} onPress={handleFinish}>
          <Text style={styles.finishTxt}>Finish Batch</Text>
        </TouchableOpacity>
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 18, fontWeight: '700', marginBottom: 12 },
  buttonRow: { flexDirection: 'row', marginBottom: 16 },
  btn: {
    backgroundColor: '#2563EB',
    padding: 10,
    borderRadius: 6,
    marginRight: 8
  },
  btnCancel: {
    backgroundColor: '#dc2626',
    padding: 10,
    borderRadius: 6,
    marginRight: 8
  },
  btnTxt: { color: '#fff', fontWeight: '600' },
  phaseCard: {
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 8,
    borderRadius: 8
  },
  phaseTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6
  },
  btnPhase: {
    backgroundColor: '#4ade80',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 6
  },
  btnPhaseTxt: {
    color: '#fff',
    fontWeight: '600'
  },
  finishBtn: {
    backgroundColor: '#16a34a',
    padding: 12,
    borderRadius: 6,
    marginTop: 16
  },
  finishTxt: {
    color: '#fff',
    fontWeight: '700',
    textAlign: 'center'
  }
});