// styles
import styles from './EditEventForm.module.scss'

// components
import Input from './../../../../../components/ui/input/Input'
import Button from './../../../../../components/ui/button/Button'

// react
import { useState } from 'react'

// services
import { editEventById } from './../../../../../services/event.service'

const CATEGORIES = [
  { id: 'Music', label: 'Музика' },
  { id: 'IT', label: 'IT' },
  { id: 'Business', label: 'Бізнес' },
  { id: 'Art', label: 'Мистецтво' },
  { id: 'Sport', label: 'Спорт' },
  { id: 'Workshops', label: 'Воркшопи' },
]

export default function EditEventForm({ event, onClose }) {
  const [formData, setFormData] = useState({
    title: event?.title || '',
    description: event?.description || '',
    slug: event?.slug || '',
    category: event?.category || 'Music',
    price: event?.price || 0,
    totalTickets: event?.totalTickets || 0,
    cityName: event?.cityName || '',
    address: event?.location?.address || '',
    lat: event?.location?.lat || 0,
    lng: event?.location?.lng || 0,
    date: event?.date ? new Date(event.date).toISOString().slice(0, 16) : '',
  })

  const handleChange = (e) => {
    const { name, value, type } = e.target

    setFormData((prev) => ({
      ...prev,

      [name]: type === 'number' ? Number(value) : value,
    }))
  }

  const handleSubmit = async (e) => {
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
    }

    const result = await editEventById(event.id, dataToSend)

    if (result) {
      alert('Подію успішно оновлено!')
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
