export function pickFields (record) {
  return {
    id: record.id,
    title: record.title,
    content: record.content,
    favorite: record.favorite,
    last_opened_at: record.lastOpenedAt,
    created_at: record.createdAt,
    updated_at: record.updatedAt
  }
}

export function patchPickFields (record) {
  return {
    id: record.id,
    title: record.title,
    content: record.content
  }
}
