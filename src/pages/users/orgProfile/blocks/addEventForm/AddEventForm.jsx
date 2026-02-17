// styles
import styles from './AddEventForm.module.scss'

// components
import Input from '../../../../../components/ui/input/Input'
import Button from '../../../../../components/ui/button/Button'

import { useAuth } from '../../../../../context/AuthContext'

// react
import { useState } from 'react'

// services
import { addEvent } from '../../../../../services/event.service'

const CATEGORIES = [
  { id: 'Music', label: 'Музика' },
  { id: 'IT', label: 'IT' },
  { id: 'Business', label: 'Бізнес' },
  { id: 'Art', label: 'Мистецтво' },
  { id: 'Sport', label: 'Спорт' },
  { id: 'Workshops', label: 'Воркшопи' },
]

export default function AddEventForm({ onClose }) {
  const { currentUser } = useAuth()

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    slug: '',
    category: 'IT',
    price: 0,
    totalTickets: 0,
    cityName: '',
    address: '',
    lat: 0,
    lng: 0,
    date: '',
  })

  const handleChange = (e) => {
    const { name, value, type } = e.target

    setFormData((prev) => ({
      ...prev,

      [name]: type === 'number' ? Number(value) : value,
    }))
  }

  const handleSubmit = async (e) => {
    if (!formData.date) return alert('Вкажіть дату')

    e.preventDefault()

    const dataToSend = {
      title: formData.title,
      description: formData.description,
      slug: formData.slug,
      category: formData.category,
      price: formData.price,
      totalTickets: formData.totalTickets,
      cityName: formData.cityName,
      date: new Date(formData.date).getTime(),
      location: {
        address: formData.address,
        lat: formData.lat,
        lng: formData.lng,
      },
      organizerId: currentUser.uid,
    }

    const result = await addEvent(dataToSend)

    if (result) {
      alert('Подію успішно створено!')
      onClose()
    } else {
      alert('Помилка при збереженні')
    }
  }

  return (
    <section className={styles.formContainer}>
      <form onSubmit={handleSubmit}>
        <fieldset className={styles.inputsBlock}>
          <div className={styles.sectionTitle}>Основне</div>

          <Input
            type="text"
            label="Назва події"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <div className={styles.textareaWrapper}>
            <label>Опис події</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className={styles.textarea}
            />
          </div>

          <div className={styles.row}>
            <div className={styles.selectWrapper}>
              <label>Категорія</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={styles.select}
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.inputWrapper}>
              <label>Дата та час</label>
              <input
                type="datetime-local"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className={styles.dateInput}
                required
              />
            </div>
          </div>

          <div className={styles.sectionTitle}>Деталі</div>

          <Input
            type="text"
            label="Назва картинки (slug)"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
          />

          <div className={styles.row}>
            <Input
              type="number"
              label="Ціна (грн)"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />

            <Input
              type="number"
              label="Всього квитків"
              name="totalTickets"
              value={formData.totalTickets}
              onChange={handleChange}
            />
          </div>

          <div className={styles.sectionTitle}>Локація</div>

          <Input
            type="text"
            label="Місто"
            name="cityName"
            value={formData.cityName}
            onChange={handleChange}
          />

          <Input
            type="text"
            label="Адреса"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />

          <div className={styles.row}>
            <Input
              type="number"
              label="Широта (Lat)"
              name="lat"
              value={formData.lat}
              onChange={handleChange}
            />
            <Input
              type="number"
              label="Довгота (Lng)"
              name="lng"
              value={formData.lng}
              onChange={handleChange}
            />
          </div>
        </fieldset>

        <div className={styles.actions}>
          <Button type="submit" fullWidth variant="primary">
            Зберегти зміни
          </Button>
          <Button type="button" onClick={onClose} fullWidth variant="ghost">
            Скасувати
          </Button>
        </div>
      </form>
    </section>
  )
}
