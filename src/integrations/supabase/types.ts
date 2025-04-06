export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      applications: {
        Row: {
          address: string
          city: string
          country: string
          dateofbirth: string
          email: string
          firstname: string
          heardaboutus: string
          id: string
          lastname: string
          musicalbackground: string
          nationality: string
          performanceexperience: string
          phone: string
          postalcode: string
          reasonforapplying: string
          scholarshipinterest: boolean | null
          source: string | null
          specialneeds: string | null
          teacheremail: string | null
          teachername: string | null
          termsagreed: boolean
          timestamp: string
          vocalrange: string
          yearsofexperience: string
        }
        Insert: {
          address: string
          city: string
          country: string
          dateofbirth: string
          email: string
          firstname: string
          heardaboutus: string
          id?: string
          lastname: string
          musicalbackground: string
          nationality: string
          performanceexperience: string
          phone: string
          postalcode: string
          reasonforapplying: string
          scholarshipinterest?: boolean | null
          source?: string | null
          specialneeds?: string | null
          teacheremail?: string | null
          teachername?: string | null
          termsagreed: boolean
          timestamp?: string
          vocalrange: string
          yearsofexperience: string
        }
        Update: {
          address?: string
          city?: string
          country?: string
          dateofbirth?: string
          email?: string
          firstname?: string
          heardaboutus?: string
          id?: string
          lastname?: string
          musicalbackground?: string
          nationality?: string
          performanceexperience?: string
          phone?: string
          postalcode?: string
          reasonforapplying?: string
          scholarshipinterest?: boolean | null
          source?: string | null
          specialneeds?: string | null
          teacheremail?: string | null
          teachername?: string | null
          termsagreed?: boolean
          timestamp?: string
          vocalrange?: string
          yearsofexperience?: string
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          email: string
          id: string
          message: string | null
          name: string
          source: string | null
          timestamp: string
          vocal_type: string
        }
        Insert: {
          email: string
          id?: string
          message?: string | null
          name: string
          source?: string | null
          timestamp?: string
          vocal_type: string
        }
        Update: {
          email?: string
          id?: string
          message?: string | null
          name?: string
          source?: string | null
          timestamp?: string
          vocal_type?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
