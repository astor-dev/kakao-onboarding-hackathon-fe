// 파스텔톤 색상 코드 리스트 (계통별 1개씩, 더 연한 톤)
const PASTEL_COLORS = [
  '#FFE8F0', // 핑크 계통
  '#FFF3E0', // 오렌지 계통
  '#FFFACD', // 노랑 계통
  '#E8F8E8', // 초록 계통
  '#E3F2FD', // 파랑 계통
  '#F3E5F5', // 보라 계통
  '#E0F7FA', // 청록 계통
  '#FFF0F5', // 로즈 계통
]

/**
 * 문자열을 받아서 파스텔톤 색상 코드를 반환하는 함수
 * 같은 입력은 항상 같은 출력을 보장합니다 (deterministic)
 * @param str - 색상을 결정할 문자열
 * @returns 파스텔톤 색상 코드 (hex)
 */
export function getPastelColor(str: string): string {
  // 간단한 해시 함수로 문자열을 숫자로 변환
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // 32bit 정수로 변환
  }

  // 음수를 양수로 변환하고 색상 리스트의 인덱스로 사용
  const index = Math.abs(hash) % PASTEL_COLORS.length
  return PASTEL_COLORS[index]
}
