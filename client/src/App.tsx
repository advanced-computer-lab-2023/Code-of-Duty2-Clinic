import './App.css'
import PatientRegisteredFamilyMembers from './components/PatientRegisteredFamilyMembers'
export default function App() {
  let Patient = {
    name: 'John Doe',
    familyMembers: [
      {
        name: 'Jane Doe',
        relationship: 'Mother'
      },
      {
        name: 'Jack Doe',
        relationship: 'Father'
      },
      {
        name: 'Jill Doe',
        relationship: 'Sister'
      },
      {
        name: 'Jake Doe',
        relationship: 'Brother'
      },
      {
        name: 'Jenny Doe',
        relationship: 'Sister'
      },
      {
        name: 'Jade Doe',
        relationship: 'Sister'
      }
    ]
  };
  return (
    <>
    <PatientRegisteredFamilyMembers patient = {Patient}/>
    </>
  )
}

