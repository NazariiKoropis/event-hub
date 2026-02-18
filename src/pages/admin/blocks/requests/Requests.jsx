import styles from './Requests.module.scss'

//components
import Button from './../../../../components/ui/button/Button'

//react
import { useState, useEffect } from 'react'

//services
import {
  getAllRequests,
  approveRequest,
  rejectRequest,
} from './../../../../services/request.service'

export default function Requests() {
  const [requests, setRequests] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const data = await getAllRequests()

    setRequests(data.filter((req) => req.status === 'pending'))
  }

  const handleApprove = async (req) => {
    if (!confirm(`Зробити ${req.displayName} організатором?`)) return

    const success = await approveRequest(req)
    if (success) {
      alert('Успішно!')
      fetchData()
    }
  }

  const handleReject = async (id) => {
    if (!confirm('Відхилити заявку?')) return

    const success = await rejectRequest(id)
    if (success) {
      fetchData()
    }
  }

  return (
    <div className={styles.list}>
      <h2>Заявки на роль Організатора</h2>

      {requests.length === 0 ? (
        <p className={styles.empty}>Нових заявок немає 🎉</p>
      ) : (
        requests.map((req) => (
          <div key={req.id} className={styles.item}>
            <div className={styles.info}>
              <strong>{req.displayName}</strong>
              <span>{req.email}</span>
              <p className={styles.desc}>"{req.description}"</p>
              <small>{new Date(req.createdAt).toLocaleDateString()}</small>
            </div>

            <div className={styles.actions}>
              <Button size="small" onClick={() => handleApprove(req)}>
                ✅ Схвалити
              </Button>
              <Button
                size="small"
                variant="secondary"
                onClick={() => handleReject(req.id)}
              >
                ❌ Відхилити
              </Button>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
